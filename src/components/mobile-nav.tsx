"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LayoutDashboard, Users, Trophy, Award, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
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

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { onFocus } = useFocusNarrator(open ? "Close navigation menu" : "Open navigation menu")
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open && triggerRef.current) {
      // Small delay to ensure sheet is closed
      const timeout = setTimeout(() => {
        triggerRef.current?.focus()
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [open])

  return (
    <div className="md:hidden">
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        onFocus={onFocus}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-haspopup="dialog"
        className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" id="mobile-nav" className="w-64 p-0 bg-sidebar">
          <SheetHeader className="px-4 py-4 border-b border-sidebar-border">
            <SheetTitle className="text-sidebar-foreground">Navigation</SheetTitle>
            <SheetDescription className="sr-only">Main navigation menu for the application</SheetDescription>
          </SheetHeader>
          <nav aria-label="Mobile navigation" className="py-4">
            <ul className="space-y-1 px-3" role="list">
              {navItems.map((item) => {
                const current = pathname === item.href
                return <MobileNavItem key={item.name} item={item} current={current} onNavigate={() => setOpen(false)} />
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

function MobileNavItem({
  item,
  current,
  onNavigate,
}: {
  item: { name: string; href: string; icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }> }
  current: boolean
  onNavigate: () => void
}) {
  const { onFocus } = useFocusNarrator(`${item.name}${current ? ", current page" : ""}`)
  const Icon = item.icon

  return (
    <li>
      <Link
        href={item.href}
        aria-current={current ? "page" : undefined}
        aria-label={item.name}
        onClick={onNavigate}
        onFocus={onFocus}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          current
            ? "bg-sidebar-primary text-sidebar-primary-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        )}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden={true} />
        <span>{item.name}</span>
      </Link>
    </li>
  )
}
