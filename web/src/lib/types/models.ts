export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type RiskLevel = "low" | "medium" | "high";
export type DiveType =
	| "recreational"
	| "technical"
	| "cave"
	| "wreck"
	| "night"
	| "wall"
	| "drift";

export interface UserProfile {
	id: string;
	email?: string;
	name?: string;
	avatar?: string;
	level?: string; // 证级别，如 AOW、Rescue 等
	experienceYears?: number;
	certifications?: string[];
	favorites?: string[]; // diveSiteIds
	logs?: string[]; // logIds
}

export interface GeoCoordinates {
	lat: number;
	lng: number;
}

export interface DiveSite {
	id: string;
	name: string;
	location: GeoCoordinates; // Firestore 可存为 GeoPoint，客户端做映射
	country: string;
	region?: string;
	description?: string;
	difficulty?: DifficultyLevel;
	type?: DiveType[];
	depthAvg?: number;
	depthMax?: number;
	visibility?: number; // 米
	temperature?: number; // 摄氏
	current?: string; // 水流强度描述
	bestSeason?: string[]; // 月份或区间
	features?: string[]; // 特色标签
	risks?: string[];
	creatures?: string[]; // creatureIds
	images?: string[]; // URLs
	coordinatesPath?: GeoCoordinates[]; // 线路或多点
	access?: string; // 上/下水方式
	nearbyAccommodation?: string[];
	nearbyShops?: string[];
	nearbyMedical?: string[];
	rating?: number;
	reviewsCount?: number;
}

export interface Review {
	id: string;
	userId: string;
	siteId: string;
	rating: number; // 1-5
	comment?: string;
	createdAt: number; // timestamp(ms)
}

export interface LogEntry {
	id: string;
	userId: string;
	siteId: string;
	date: string; // ISO
	visibility?: number;
	temperature?: number;
	creaturesSeen?: string[];
	experience?: string;
	images?: string[]; // URLs
	rating?: number; // 1-5
	comments?: string[];
}

export interface Creature {
	id: string;
	name: string;
	scientificName?: string;
	description?: string;
	images?: string[];
	sightingSeasons?: string[];
	diveSites?: string[]; // diveSiteIds
	riskLevel?: RiskLevel;
}


