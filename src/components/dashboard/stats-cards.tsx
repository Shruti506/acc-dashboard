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
      <StatCard title="Total Users" value={totalUsers} icon={Users} description="All registered users" />
      <StatCard
        title="Active Users"
        value={activeUsers}
        icon={UserCheck}
        description="Currently active"
        iconClassName="text-secondary"
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
        iconClassName="text-accent"
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
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-default"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconClassName || "text-muted-foreground"}`} aria-hidden={true} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}
