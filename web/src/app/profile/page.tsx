'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/auth-provider'
import { isFirebaseEnabled } from '@/lib/firebase'

export default function ProfilePage() {
	const { user, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!isFirebaseEnabled()) return
		if (!loading && !user) router.replace('/login')
	}, [loading, user, router])

	if (loading) return <div className="p-6">加载中...</div>
	if (isFirebaseEnabled() && !user) return null

	return (
		<div className="max-w-2xl mx-auto p-6 space-y-2">
			<h1 className="text-xl font-semibold">我的资料</h1>
			{isFirebaseEnabled() ? (
				<>
					<p>昵称：{user?.displayName ?? '未设置'}</p>
					<p>邮箱：{user?.email}</p>
				</>
			) : (
				<p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">未配置 Firebase，展示示例个人页。</p>
			)}
		</div>
	)
}


