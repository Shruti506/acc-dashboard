"use client"

import { useUserStore } from "@/contexts/user-context"
import { StatsCards } from "./stats-cards"
import { Separator } from "@/components/ui/separator"
import { ChartAreaInteractive } from "./chart-area-interactive"

export default function DashboardContent() {
  const { stats } = useUserStore()

  return (
    <>
      <section aria-labelledby="page-stats">
        <StatsCards
          totalUsers={stats.total}
          activeUsers={stats.active}
          inactiveUsers={stats.inactive}
          pendingUsers={stats.pending}
        />
      </section>

      <Separator />
      <ChartAreaInteractive />
    </>
  )
}
