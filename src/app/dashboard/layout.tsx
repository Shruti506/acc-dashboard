"use client"

import { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { NarratorToggle } from "@/components/narrator-toggle"
import { UserProvider, useUserStore } from "@/contexts/user-context"

interface DashboardLayoutProps {
  children: ReactNode
}

function LiveRegion() {
  const { statusMessage } = useUserStore()

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      id="status-region"
    >
      {statusMessage}
    </div>
  )
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <UserProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />

        <div className="flex-1 md:ml-64">
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-4">
                <MobileNav />
                <h1 className="text-xl font-semibold text-foreground">User Management Dashboard</h1>
              </div>
              <div className="hidden md:block">
                <NarratorToggle />
              </div>
            </div>
          </header>

          <LiveRegion />

          <main id="main-content" className="p-4 sm:p-6 lg:p-8" tabIndex={-1}>
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  )
}
