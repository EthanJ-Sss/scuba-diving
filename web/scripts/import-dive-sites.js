#!/usr/bin/env node
// Simple CSV -> JSON importer for dive sites
// Usage: node scripts/import-dive-sites.js --input data/dive-sites.csv --output public/data/dive-sites.json

const fs = require('fs')
const path = require('path')

function parseArgs() {
  const args = process.argv.slice(2)
  const opts = { input: 'data/dive-sites.csv', output: 'public/data/dive-sites.json' }
  for (let i = 0; i < args.length; i += 2) {
    const k = args[i]
    const v = args[i + 1]
    if (!v) continue
    if (k === '--input') opts.input = v
    if (k === '--output') opts.output = v
  }
  return opts
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function parseCsvText(text) {
  // naive CSV parser (no quoted comma support). Template avoids commas inside fields.
  const lines = text.split(/\r?\n/).filter(Boolean)
  const header = lines.shift().split(',').map(h => h.trim())
  return lines.map(line => {
    const cols = line.split(',').map(c => c.trim())
    const row = {}
    header.forEach((h, idx) => (row[h] = cols[idx] ?? ''))
    return row
  })
}

function toNumber(n) {
  if (n === undefined || n === null || n === '') return undefined
  const num = Number(n)
  return Number.isFinite(num) ? num : undefined
}

function toStringArray(s) {
  if (!s) return undefined
  return String(s)
    .split('|')
    .map(x => x.trim())
    .filter(Boolean)
}

function transform(rows) {
  return rows.map((r, idx) => {
    const lng = toNumber(r.lng)
    const lat = toNumber(r.lat)
    return {
      id: r.id || `site-${idx + 1}`,
      name: r.name || `Unnamed ${idx + 1}`,
      coordinates: [lng ?? 0, lat ?? 0],
      difficulty: r.difficulty || 'beginner',
      country: r.country || undefined,
      region: r.region || undefined,
      description: r.description || undefined,
      depthAvg: toNumber(r.depthAvg),
      depthMax: toNumber(r.depthMax),
      visibility: toNumber(r.visibility),
      temperature: toNumber(r.temperature),
      bestSeason: toStringArray(r.bestSeason),
      type: toStringArray(r.type),
      features: toStringArray(r.features),
      risks: toStringArray(r.risks),
      nearbyAccommodation: toStringArray(r.nearbyAccommodation),
      nearbyShops: toStringArray(r.nearbyShops),
      nearbyMedical: toStringArray(r.nearbyMedical),
    }
  })
}

function main() {
  const { input, output } = parseArgs()
  const inPath = path.resolve(process.cwd(), input)
  const outPath = path.resolve(process.cwd(), output)
  if (!fs.existsSync(inPath)) {
    console.error(`Input not found: ${inPath}`)
    process.exit(1)
  }
  const csv = fs.readFileSync(inPath, 'utf-8')
  const rows = parseCsvText(csv)
  const data = transform(rows)
  ensureDir(outPath)
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2))
  console.log(`Wrote ${data.length} sites -> ${outPath}`)
}

main()


