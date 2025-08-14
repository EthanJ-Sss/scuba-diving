export type SampleMarker = {
    id: string
    name: string
    coordinates: [number, number] // [lng, lat]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    country?: string
    region?: string
    description?: string
    depthAvg?: number
    depthMax?: number
    visibility?: number
    temperature?: number
    bestSeason?: string[]
    type?: string[]
    features?: string[]
}

export const sampleDiveSites: SampleMarker[] = [
    {
        id: 'bali-manta',
        name: 'Nusa Penida - Manta Point',
        coordinates: [115.496, -8.733],
        difficulty: 'intermediate',
        country: 'Indonesia',
        region: 'Bali',
        description: '蝠鲼清洁站，概率高，水流较强，常有涌浪。',
        depthAvg: 15,
        depthMax: 25,
        visibility: 20,
        temperature: 25,
        bestSeason: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        type: ['drift', 'reef'],
        features: ['manta', 'coral']
    },
    {
        id: 'egypt-blue',
        name: 'Blue Hole - Dahab',
        coordinates: [34.544, 28.571],
        difficulty: 'advanced',
        country: 'Egypt',
        region: 'Red Sea',
        description: '著名蓝洞，深度大，技术潜水热点，注意安全规划。',
        depthAvg: 30,
        depthMax: 100,
        visibility: 30,
        temperature: 24,
        bestSeason: ['Mar', 'Apr', 'May', 'Oct', 'Nov'],
        type: ['blue-hole', 'wall'],
        features: ['deep', 'blue-hole']
    },
    {
        id: 'philippines-tubbataha',
        name: 'Tubbataha Reef',
        coordinates: [120.100, 9.061],
        difficulty: 'advanced',
        country: 'Philippines',
        region: 'Sulu Sea',
        description: '离岸海洋保护区，巨物概率高，能见度优秀。',
        depthAvg: 18,
        depthMax: 40,
        visibility: 30,
        temperature: 27,
        bestSeason: ['Mar', 'Apr', 'May', 'Jun'],
        type: ['reef', 'wall'],
        features: ['shark', 'manta', 'coral']
    },
    {
        id: 'thailand-richelieu',
        name: 'Richelieu Rock',
        coordinates: [97.839, 9.364],
        difficulty: 'intermediate',
        country: 'Thailand',
        region: 'Andaman',
        description: '五彩软珊瑚与微距天堂，偶遇鲸鲨。',
        depthAvg: 16,
        depthMax: 30,
        visibility: 20,
        temperature: 28,
        bestSeason: ['Jan', 'Feb', 'Mar', 'Apr'],
        type: ['reef'],
        features: ['macro', 'soft-coral']
    },
]


