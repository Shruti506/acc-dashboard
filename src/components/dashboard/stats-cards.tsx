"use client"

import type React from "react"
import { Users, UserCheck, UserX, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"

interface StatsCardsProps {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  pendingUsers: number
}

export function StatsCards({ totalUsers, activeUsers, inactiveUsers, pendingUsers }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="region" aria-label="User statistics">
      <StatCard
        title="Total Users"
        value={totalUsers}
        icon={Users}
        description="All registered users"
        iconClassName="text-primary"
      />
      <StatCard
        title="Active Users"
        value={activeUsers}
        icon={UserCheck}
        description="Currently active"
        iconClassName="text-secondary-foreground"
      />
      <StatCard
        title="Inactive Users"
        value={inactiveUsers}
        icon={UserX}
        description="Account inactive"
        iconClassName="text-destructive"
      />
      <StatCard
        title="Pending Users"
        value={pendingUsers}
        icon={Clock}
        description="Awaiting approval"
        iconClassName="text-accent-foreground"
      />
    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  iconClassName,
}: {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  description: string
  iconClassName?: string
}) {
  const { onFocus } = useFocusNarrator(`${title}: ${value} users. ${description}`)

  return (
    <Card
      tabIndex={0}
      onFocus={onFocus}
      role="article"
      aria-label={`${title}: ${value}`}
      className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border/50 group bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110" />

      <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">
          {title}
        </CardTitle>
        <div className="p-2.5 rounded-xl bg-muted group-hover:bg-primary/10 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110 border border-border/50">
          <Icon className={`h-5 w-5 ${iconClassName || "text-muted-foreground"}`} aria-hidden={true} />
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="text-3xl font-bold text-card-foreground mb-1 transition-all duration-300 group-hover:scale-105">
          {value.toLocaleString()}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>

        <div className="mt-3 h-1 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 group-hover:w-full"
            style={{ width: '60%' }}
          />
        </div>
      </CardContent>
    </Card>
  )
}