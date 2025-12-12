// Leaderboard data types
export interface LeaderboardEntry {
  id: string
  rank: number
  previousRank: number | null
  name: string
  score: number
  change: number
  category: "sales" | "performance" | "engagement"
  avatar?: string
}

export type CategoryFilter = "all" | "sales" | "performance" | "engagement"
export type PeriodFilter = "today" | "week" | "month" | "quarter" | "year"
