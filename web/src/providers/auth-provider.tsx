'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth'
import { getFirebaseAuth, isFirebaseEnabled } from '@/lib/firebase'

type AuthContextValue = {
	user: User | null
	loading: boolean
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!isFirebaseEnabled()) {
			setLoading(false)
			return
		}
		const auth = getFirebaseAuth()
		const unsub = onAuthStateChanged(auth, (u) => {
			setUser(u)
			setLoading(false)
		})
		return () => unsub()
	}, [])

	const signOut = async () => {
		if (!isFirebaseEnabled()) return
		await firebaseSignOut(getFirebaseAuth())
	}

	return (
		<AuthContext.Provider value={{ user, loading, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}


