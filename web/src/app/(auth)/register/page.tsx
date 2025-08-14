'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { getFirebaseAuth, isFirebaseEnabled } from '@/lib/firebase'
import Link from 'next/link'

export default function RegisterPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)
		try {
			if (!isFirebaseEnabled()) throw new Error('当前未配置 Firebase，已禁用注册功能。')
			const cred = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
			if (name) await updateProfile(cred.user, { displayName: name })
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : '注册失败，请重试'
			setError(message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-md mx-auto p-6">
			<h1 className="text-xl font-semibold mb-4">注册</h1>
			<form onSubmit={onSubmit} className="space-y-4">
				<input
					type="text"
					placeholder="昵称（可选）"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full border rounded px-3 py-2"
				/>
				<input
					type="email"
					placeholder="邮箱"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full border rounded px-3 py-2"
					required
				/>
				<input
					type="password"
					placeholder="密码（至少6位）"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full border rounded px-3 py-2"
					required
				/>
				{error && <p className="text-red-600 text-sm">{error}</p>}
				<button disabled={loading} className="w-full bg-black text-white rounded py-2 disabled:opacity-60">
					{loading ? '注册中...' : '注册'}
				</button>
			</form>
			<p className="mt-4 text-sm">
				已有账号？<Link href="/login" className="underline">去登录</Link>
			</p>
			{!isFirebaseEnabled() && (
				<p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
					提示：未配置 Firebase，登录/注册功能暂不可用。请参考 README 配置 `.env.local` 后重启。
				</p>
			)}
		</div>
	)
}


