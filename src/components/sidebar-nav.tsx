"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Trophy, Award, Settings, HelpCircle } from "lucide-react"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { name: "Badges", href: "/dashboard/badges", icon: Award },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Main navigation" className="flex-1 py-4">
      <ul className="space-y-1 px-3" role="list">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.name}
            name={item.name}
            href={item.href}
            icon={item.icon}
            current={pathname === item.href}
          />
        ))}
      </ul>
    </nav>
  )
}

function SidebarNavItem({
  name,
  href,
  icon: Icon,
  current,
}: {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  current: boolean
}) {
  const { onFocus } = useFocusNarrator(`${name} navigation link${current ? ", current page" : ""}`)

  return (
    <li>
      <Link
        href={href}
        aria-current={current ? "page" : undefined}
        aria-label={name}
        onFocus={onFocus}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          current
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden={true} />
        <span>{name}</span>
      </Link>
    </li>
  )
}
