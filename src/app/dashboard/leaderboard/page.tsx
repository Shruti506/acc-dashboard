"use client"

import { useState, useMemo } from "react"
import { Trophy } from "lucide-react"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import { mockLeaderboardData } from "@/data/leaderboard-data"
import type { CategoryFilter, PeriodFilter } from "@/lib/leaderboard-types"
import { LeaderboardStats } from "@/components/leaderboard/leaderboard-stats"
import { LeaderboardFilters } from "@/components/leaderboard/leaderboard-filters"
import { TopThreePodium } from "@/components/leaderboard/top-three-podium"
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table"
import { PageHeader } from "@/components/common/page-header"

export default function LeaderboardPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all")
    const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("month")

    const { onFocus: onHeaderFocus } = useFocusNarrator("Leaderboard page, view top performers and rankings")

    // Filter entries
    const filteredEntries = useMemo(() => {
        return mockLeaderboardData.filter((entry) => {
            const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = categoryFilter === "all" || entry.category === categoryFilter
            return matchesSearch && matchesCategory
        })
    }, [searchTerm, categoryFilter])

    // Reset filters
    const handleResetFilters = () => {
        setSearchTerm("")
        setCategoryFilter("all")
        setPeriodFilter("month")
    }

    // Split entries: top 3 for podium, rest for table
    const topThree = filteredEntries.slice(0, 3)
    const remainingEntries = filteredEntries.slice(3)

    return (
        <div className="">
            <div className="mx-auto max-w-7xl space-y-8">
                <PageHeader
                    title="Leaderboard"
                    description="Track top performers and rankings across all categories"
                    icon={<Trophy className="h-6 w-6 text-primary" aria-hidden="true" />}
                    onFocus={onHeaderFocus}
                />

                <LeaderboardStats entries={filteredEntries} />

                {topThree.length > 0 && <TopThreePodium entries={topThree} />}
            </div>
        </div>
    )
}
