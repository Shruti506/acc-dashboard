"use client"

import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import { cn } from "@/lib/utils"
import type { LeaderboardEntry } from "@/lib/leaderboard-types"

interface LeaderboardTableProps {
    entries: LeaderboardEntry[]
    startRank?: number
}

export function LeaderboardTable({ entries, startRank = 1 }: LeaderboardTableProps) {
    const tableNarration = entries.length
        ? `Showing ${entries.length} leaderboard entries starting from rank ${startRank}. ${entries
            .map(
                (e, i) =>
                    `Row ${i + 1}: Rank ${e.rank}, ${e.name}, ${e.score.toLocaleString()} points, ${e.category} category.`,
            )
            .join(" ")}`
        : "No leaderboard entries found."

    return (
        <section
            aria-label="Full leaderboard rankings"
            className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
        >
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {tableNarration}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse" role="table" aria-label="Leaderboard rankings table">
                    <thead>
                        <tr className="border-b border-border bg-muted/50">
                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4 text-right text-sm font-semibold">
                                Score
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-sm font-semibold">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-4 text-center text-sm font-semibold">
                                Change
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-lg font-medium">No entries found</p>
                                        <p className="text-sm">Try adjusting your filters</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            entries.map((entry, index) => <LeaderboardRow key={entry.id} entry={entry} rowIndex={index + 1} />)
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

function LeaderboardRow({ entry, rowIndex }: { entry: LeaderboardEntry; rowIndex: number }) {
    const { onFocus: onRankFocus } = useFocusNarrator(`Row ${rowIndex}, Rank: ${entry.rank}`)
    const { onFocus: onNameFocus } = useFocusNarrator(`Row ${rowIndex}, Name: ${entry.name}`)
    const { onFocus: onScoreFocus } = useFocusNarrator(`Row ${rowIndex}, Score: ${entry.score.toLocaleString()} points`)
    const { onFocus: onCategoryFocus } = useFocusNarrator(`Row ${rowIndex}, Category: ${entry.category}`)
    const { onFocus: onChangeFocus } = useFocusNarrator(
        `Row ${rowIndex}, Change: ${entry.change === 0 ? "no change" : entry.change > 0 ? `up ${entry.change}` : `down ${Math.abs(entry.change)}`}`,
    )

    const getRankStyles = (rank: number) => {
        if (rank <= 3) {
            const topRankStyles = {
                1: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 border-yellow-500/30 font-bold",
                2: "bg-slate-400/10 text-slate-700 dark:text-slate-400 border-slate-400/30 font-bold",
                3: "bg-amber-600/10 text-amber-700 dark:text-amber-600 border-amber-600/30 font-bold",
            }
            return topRankStyles[rank as keyof typeof topRankStyles]
        }
        return "bg-muted/50 text-muted-foreground border-border"
    }

    const getCategoryStyles = (category: string) => {
        const styles = {
            sales: "bg-chart-1/10 text-chart-1 border-chart-1/30",
            performance: "bg-chart-2/10 text-chart-2 border-chart-2/30",
            engagement: "bg-chart-3/10 text-chart-3 border-chart-3/30",
        }
        return styles[category as keyof typeof styles] || "bg-muted text-muted-foreground border-border"
    }

    return (
        <tr className="border-b border-border hover:bg-accent/50 transition-colors group">
            {/* Rank Cell */}
            <td tabIndex={0} onFocus={onRankFocus} scope="row" className="px-6 py-4">
                <Badge variant="outline" className={cn("font-semibold min-w-[60px] justify-center", getRankStyles(entry.rank))}>
                    #{entry.rank}
                </Badge>
            </td>

            {/* Name Cell */}
            <td tabIndex={0} onFocus={onNameFocus} className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary ring-2 ring-primary/20 transition-transform group-hover:scale-110">
                        {entry.avatar}
                    </div>
                    <span className="font-medium">{entry.name}</span>
                </div>
            </td>

            {/* Score Cell */}
            <td tabIndex={0} onFocus={onScoreFocus} className="px-6 py-4 text-right font-bold text-lg">
                {entry.score.toLocaleString()}
            </td>

            {/* Category Cell */}
            <td tabIndex={0} onFocus={onCategoryFocus} className="px-6 py-4">
                <Badge variant="outline" className={cn("text-xs capitalize", getCategoryStyles(entry.category))}>
                    {entry.category}
                </Badge>
            </td>

            {/* Change Cell */}
            <td tabIndex={0} onFocus={onChangeFocus} className="px-6 py-4">
                <div className="flex items-center justify-center gap-1.5">
                    {entry.change > 0 ? (
                        <>
                            <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1">
                                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" aria-hidden="true" />
                                <span
                                    className="text-sm font-medium text-green-600 dark:text-green-500"
                                    aria-label={`Up ${entry.change} positions`}
                                >
                                    +{entry.change}
                                </span>
                            </div>
                        </>
                    ) : entry.change < 0 ? (
                        <>
                            <div className="flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1">
                                <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-500" aria-hidden="true" />
                                <span
                                    className="text-sm font-medium text-red-600 dark:text-red-500"
                                    aria-label={`Down ${Math.abs(entry.change)} positions`}
                                >
                                    {entry.change}
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
                                <Minus className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                <span className="text-sm text-muted-foreground" aria-label="No change in position">
                                    0
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
}
