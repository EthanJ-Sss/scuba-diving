'use client'

import Link from 'next/link'
import { useAuth } from '@/providers/auth-provider'

export default function Header() {
	const { user, signOut, loading } = useAuth()
	return (
		<header className="w-full border-b sticky top-0 bg-white/80 backdrop-blur z-10">
			<div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
				<Link href="/" className="font-semibold">Scuba Sites</Link>
				<nav className="flex items-center gap-4 text-sm">
					<Link href="/">地图</Link>
					<Link href="/profile">我的</Link>
					{!loading && (
						user ? (
							<button onClick={signOut} className="px-3 py-1 rounded bg-black text-white">退出</button>
						) : (
							<>
								<Link href="/login">登录</Link>
								<Link href="/register">注册</Link>
							</>
						)
					)}
				</nav>
			</div>
		</header>
	)
}


