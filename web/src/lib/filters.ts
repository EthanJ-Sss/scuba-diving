export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | ''

export type Site = {
  id: string
  name: string
  difficulty?: Difficulty
  country?: string
  bestSeason?: string[]
  type?: string[]
}

export type Filters = {
  q?: string
  level?: Difficulty
  country?: string
  season?: string
  dtype?: string
}

export function filterSites(sites: Site[], filters: Filters): Site[] {
  const q = (filters.q ?? '').trim().toLowerCase()
  const level = (filters.level ?? '') as Difficulty
  const country = (filters.country ?? '').trim().toLowerCase()
  const season = (filters.season ?? '').trim().toLowerCase()
  const dtype = (filters.dtype ?? '').trim()

  return sites.filter((s) => {
    const okName = q ? s.name.toLowerCase().includes(q) : true
    const okLevel = level ? s.difficulty === level : true
    const okCountry = country ? (s.country?.toLowerCase() === country) : true
    const okSeason = season ? (s.bestSeason?.some(m => m.toLowerCase() === season)) : true
    const okType = dtype ? (s.type?.includes(dtype)) : true
    return okName && okLevel && okCountry && okSeason && okType
  })
}


