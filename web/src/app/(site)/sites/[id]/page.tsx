"use client"

import { useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { sampleDiveSites } from "@/data/sample-dive-sites"

export default function SiteDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const router = useRouter()
  const site = useMemo(()=> sampleDiveSites.find(s=>s.id===id), [id])

  if (!site) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p className="text-sm text-gray-600 mb-4">未找到该潜点。</p>
        <Link href="/" className="underline">返回首页</Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <button className="text-sm underline" onClick={()=>router.back()}>&larr; 返回</button>
      <h1 className="text-2xl font-semibold">{site.name}</h1>
      <div className="text-sm text-gray-600">{site.country} · {site.region} · 难度：{site.difficulty}</div>
      <p>{site.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <div className="border rounded p-3">平均深度：{site.depthAvg ?? '-'} m</div>
        <div className="border rounded p-3">最大深度：{site.depthMax ?? '-'} m</div>
        <div className="border rounded p-3">能见度：{site.visibility ?? '-'} m</div>
        <div className="border rounded p-3">水温：{site.temperature ?? '-'} ℃</div>
        <div className="border rounded p-3">最佳季节：{site.bestSeason?.join(', ') ?? '-'}</div>
        <div className="border rounded p-3">类型：{site.type?.join(', ') ?? '-'}</div>
      </div>
      <div className="text-sm">特色：{site.features?.join(', ') ?? '-'}</div>
      <div className="text-sm">
        风险提示：{site.risks?.join('、') ?? '—'}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
        <div className="border rounded p-3">
          <div className="font-medium mb-1">住宿</div>
          <div>{site.nearbyAccommodation?.join('、') ?? '—'}</div>
        </div>
        <div className="border rounded p-3">
          <div className="font-medium mb-1">潜店</div>
          <div>{site.nearbyShops?.join('、') ?? '—'}</div>
        </div>
        <div className="border rounded p-3">
          <div className="font-medium mb-1">医疗</div>
          <div>{site.nearbyMedical?.join('、') ?? '—'}</div>
        </div>
      </div>
    </div>
  )
}


