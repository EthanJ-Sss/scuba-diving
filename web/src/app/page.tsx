"use client"
import Map, { MapHandle } from "@/components/Map";
import { sampleDiveSites } from "@/data/sample-dive-sites";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const mapRef = useRef<MapHandle>(null)
  const [q, setQ] = useState("")
  const [level, setLevel] = useState("")
  const [country, setCountry] = useState("")
  const [season, setSeason] = useState("")
  const [dtype, setDtype] = useState("")
  const [remoteData, setRemoteData] = useState<typeof sampleDiveSites | null>(null)

  // 优先从 public/data 加载导入后的 JSON 数据，失败则回退示例数据
  useEffect(() => {
    let canceled = false
    fetch('/data/dive-sites.json', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) return null
        try { return await res.json() } catch { return null }
      })
      .then((json) => { if (!canceled && Array.isArray(json)) setRemoteData(json as any) })
      .catch(() => {})
    return () => { canceled = true }
  }, [])

  const data = remoteData ?? sampleDiveSites
  const filtered = useMemo(() => {
    return data.filter((s) => {
      const okName = q ? s.name.toLowerCase().includes(q.toLowerCase()) : true
      const okLevel = level ? s.difficulty === level : true
      const okCountry = country ? (s.country?.toLowerCase() === country.toLowerCase()) : true
      const okSeason = season ? (s.bestSeason?.some(m => m.toLowerCase() === season.toLowerCase())) : true
      const okType = dtype ? (s.type?.includes(dtype)) : true
      return okName && okLevel && okCountry && okSeason && okType
    })
  }, [data, q, level, country, season, dtype])

  return (
    <div className="min-h-screen p-6 sm:p-8 space-y-4">
      <h1 className="text-2xl font-semibold">潜水潜点推荐平台 · 地图预览</h1>
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative">
          <input className="border rounded px-3 py-2 w-60" placeholder="搜索潜点名称..." value={q} onChange={(e)=>setQ(e.target.value)} />
          {q && (
            <div className="absolute left-0 right-0 bg-white border rounded mt-1 max-h-56 overflow-auto z-10">
              {filtered.slice(0,6).map(s => (
                <button key={s.id} className="w-full text-left px-3 py-2 hover:bg-gray-50" onClick={()=>{ setQ(s.name); mapRef.current?.flyTo(s.coordinates[0], s.coordinates[1], 7) }}>
                  {s.name}
                </button>
              ))}
              {filtered.length===0 && <div className="px-3 py-2 text-sm text-gray-500">无匹配结果</div>}
            </div>
          )}
        </div>
        <select className="border rounded px-3 py-2" value={country} onChange={(e)=>setCountry(e.target.value)}>
          <option value="">全部国家</option>
          {[...new Set(data.map(d=>d.country).filter(Boolean))].map(c => (
            <option key={String(c)} value={String(c)}>{String(c)}</option>
          ))}
        </select>
        <select className="border rounded px-3 py-2" value={level} onChange={(e)=>setLevel(e.target.value)}>
          <option value="">全部难度</option>
          <option value="beginner">初级</option>
          <option value="intermediate">中级</option>
          <option value="advanced">高级</option>
        </select>
        <select className="border rounded px-3 py-2" value={dtype} onChange={(e)=>setDtype(e.target.value)}>
          <option value="">全部类型</option>
          {[...new Set(data.flatMap(d=>d.type ?? []))].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select className="border rounded px-3 py-2" value={season} onChange={(e)=>setSeason(e.target.value)}>
          <option value="">全年月份</option>
          {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4 items-start">
        <Map
          ref={mapRef}
          className="w-full h-[70vh] rounded-lg"
          markers={filtered.map((s) => ({
            id: s.id,
            coordinates: s.coordinates,
            color:
              s.difficulty === 'advanced' ? '#ef4444' : s.difficulty === 'intermediate' ? '#f59e0b' : '#22c55e',
            popupHtml: `<strong>${s.name}</strong><br/>难度：${s.difficulty}<br/><a href=\"/sites/${s.id}\" style=\"text-decoration:underline;color:#2563eb\">查看详情</a>`,
          }))}
        />
        <div className="max-h-[70vh] overflow-auto border rounded">
          {filtered.map((s)=> (
            <div key={s.id} className="px-3 py-2 hover:bg-gray-50 border-b">
              <button className="text-left w-full" onClick={()=>mapRef.current?.flyTo(s.coordinates[0], s.coordinates[1], 7)}>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-gray-500">难度：{s.difficulty}</div>
              </button>
              <a href={`/sites/${s.id}`} className="text-xs underline text-blue-600">查看详情</a>
            </div>
          ))}
          {filtered.length===0 && <div className="p-3 text-sm text-gray-500">未找到匹配的潜点</div>}
        </div>
      </div>
    </div>
  );
}
