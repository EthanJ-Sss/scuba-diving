import { filterSites } from './filters'

const sites = [
  { id: 'a', name: 'Alpha', difficulty: 'beginner', country: 'X', bestSeason: ['Jan'], type: ['reef'] },
  { id: 'b', name: 'Beta', difficulty: 'intermediate', country: 'Y', bestSeason: ['Feb','Mar'], type: ['wall'] },
  { id: 'c', name: 'Gamma Point', difficulty: 'advanced', country: 'X', bestSeason: ['Mar'], type: ['reef','wall'] },
]

describe('filterSites', () => {
  it('filters by name', () => {
    const res = filterSites(sites as any, { q: 'alpha' })
    expect(res.map(r=>r.id)).toEqual(['a'])
  })

  it('filters by difficulty', () => {
    const res = filterSites(sites as any, { level: 'advanced' })
    expect(res.map(r=>r.id)).toEqual(['c'])
  })

  it('filters by country', () => {
    const res = filterSites(sites as any, { country: 'x' })
    expect(res.map(r=>r.id)).toEqual(['a','c'])
  })

  it('filters by season and type', () => {
    const res = filterSites(sites as any, { season: 'mar', dtype: 'wall' })
    expect(res.map(r=>r.id)).toEqual(['b','c'])
  })
})


