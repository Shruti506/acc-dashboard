"use client"

import { TrendingUp, Users, Award, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import type { LeaderboardEntry } from "@/lib/leaderboard-types"

interface LeaderboardStatsProps {
  entries: LeaderboardEntry[]
}

export function LeaderboardStats({ entries }: LeaderboardStatsProps) {
  const totalParticipants = entries.length
  const averageScore =
    entries.length > 0 ? Math.round(entries.reduce((sum, e) => sum + e.score, 0) / entries.length) : 0
  const topScore = entries.length > 0 ? entries[0].score : 0
  const movingUp = entries.filter((e) => e.change > 0).length

  const stats = [
    {
      label: "Total Participants",
      value: totalParticipants,
      icon: Users,
      iconColor: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      label: "Average Score",
      value: averageScore.toLocaleString(),
      icon: Activity,
      iconColor: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      label: "Top Score",
      value: topScore.toLocaleString(),
      icon: Award,
      iconColor: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Moving Up",
      value: movingUp,
      icon: TrendingUp,
      iconColor: "text-green-600 dark:text-green-500",
      bgColor: "bg-green-500/10",
    },
  ]

  return (
    <section aria-label="Leaderboard statistics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </section>
  )
}

function StatCard({ stat, index }: { stat: any; index: number }) {
  const { onFocus } = useFocusNarrator(` ${stat.label}, ${stat.value}`)

  return (
    <Card
      tabIndex={0}
      onFocus={onFocus}
      className="transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label={`${stat.label}: ${stat.value}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
            <stat.icon className={`h-6 w-6 ${stat.iconColor}`} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
