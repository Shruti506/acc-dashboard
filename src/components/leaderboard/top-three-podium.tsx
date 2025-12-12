"use client"

import { Trophy, Medal, TrendingUp, TrendingDown, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import { cn } from "@/lib/utils"
import type { LeaderboardEntry } from "@/lib/leaderboard-types"

interface TopThreePodiumProps {
  entries: LeaderboardEntry[]
}

export function TopThreePodium({ entries }: TopThreePodiumProps) {
  const topThree = entries.slice(0, 3)

  if (topThree.length === 0) return null

  // Reorder for podium display: [2nd, 1st, 3rd]
  const podiumOrder = [topThree[1], topThree[0], topThree[2]].filter(Boolean)

  return (
    <section aria-label="Top three leaders" className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Top Performers</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {podiumOrder.map((entry, displayIndex) => {
          if (!entry) return null
          const actualRank = entry.rank
          return <PodiumCard key={entry.id} entry={entry} displayIndex={displayIndex} actualRank={actualRank} />
        })}
      </div>
    </section>
  )
}

function PodiumCard({
  entry,
  displayIndex,
  actualRank,
}: {
  entry: LeaderboardEntry
  displayIndex: number
  actualRank: number
}) {
  const { onFocus } = useFocusNarrator(`Rank ${actualRank}: ${entry.name} with ${entry.score.toLocaleString()} points`)

  const isFirst = actualRank === 1
  const isSecond = actualRank === 2
  const isThird = actualRank === 3

  const podiumConfig = {
    1: {
      Icon: Trophy,
      iconColor: "text-yellow-600 dark:text-yellow-500",
      bgGradient: "from-yellow-500/10 via-yellow-500/5 to-transparent",
      borderColor: "border-yellow-500/20 hover:border-yellow-500/40",
      avatarBg: "bg-gradient-to-br from-yellow-500/20 to-yellow-600/20",
      avatarRing: "ring-2 ring-yellow-500/30",
      height: "md:min-h-[280px]",
    },
    2: {
      Icon: Medal,
      iconColor: "text-slate-500 dark:text-slate-400",
      bgGradient: "from-slate-500/10 via-slate-500/5 to-transparent",
      borderColor: "border-slate-500/20 hover:border-slate-500/40",
      avatarBg: "bg-gradient-to-br from-slate-500/20 to-slate-600/20",
      avatarRing: "ring-2 ring-slate-500/30",
      height: "md:min-h-[260px]",
    },
    3: {
      Icon: Medal,
      iconColor: "text-amber-700 dark:text-amber-600",
      bgGradient: "from-amber-700/10 via-amber-700/5 to-transparent",
      borderColor: "border-amber-700/20 hover:border-amber-700/40",
      avatarBg: "bg-gradient-to-br from-amber-700/20 to-amber-800/20",
      avatarRing: "ring-2 ring-amber-700/30",
      height: "md:min-h-[240px]",
    },
  }

  const config = podiumConfig[actualRank as keyof typeof podiumConfig]
  const { Icon, iconColor, bgGradient, borderColor, avatarBg, avatarRing, height } = config

  return (
    <article
      tabIndex={0}
      onFocus={onFocus}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-gradient-to-b transition-all duration-300",
        "hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        bgGradient,
        borderColor,
        height,
        isFirst && "md:scale-105",
      )}
      aria-label={`Rank ${actualRank}: ${entry.name}, Score: ${entry.score.toLocaleString()}`}
    >
      {/* Rank Badge - Top Right */}
      <div className="absolute right-4 top-4 z-10">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:scale-110",
            avatarBg,
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} aria-hidden="true" />
        </div>
      </div>

      <div className="relative p-6">
        {/* Avatar */}
        <div className="mb-4 flex justify-center">
          <div
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold transition-transform group-hover:scale-110",
              avatarBg,
              avatarRing,
            )}
          >
            {entry.avatar}
          </div>
        </div>

        {/* Name and Rank */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold mb-1">{entry.name}</h3>
          <p className="text-sm text-muted-foreground">Rank #{actualRank}</p>
        </div>

        {/* Score */}
        <div className="text-center mb-4">
          <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {entry.score.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">points</p>
        </div>

        {/* Category and Change */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {entry.category.charAt(0).toUpperCase() + entry.category.slice(1)}
          </Badge>
          {entry.change !== 0 && (
            <div className="flex items-center gap-1">
              {entry.change > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-500" aria-hidden="true" />
                  <span
                    className="text-xs font-medium text-green-600 dark:text-green-500"
                    aria-label={`Up ${entry.change} positions`}
                  >
                    +{entry.change}
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-500" aria-hidden="true" />
                  <span
                    className="text-xs font-medium text-red-600 dark:text-red-500"
                    aria-label={`Down ${Math.abs(entry.change)} positions`}
                  >
                    {entry.change}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
