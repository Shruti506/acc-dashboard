"use client"

import { SidebarNav } from "@/components/sidebar-nav"
import { NarratorToggle } from "@/components/narrator-toggle"

export function AppSidebar() {
  return (
    <aside
      className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-sidebar border-r border-sidebar-border"
      aria-label="Sidebar"
      role="complementary"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <span className="text-lg font-semibold text-sidebar-foreground">Admin Panel</span>
        </div>

        {/* Navigation */}
        <SidebarNav />

        {/* Footer with accessibility controls */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground" id="narrator-label">
              Narrator
            </span>
            <NarratorToggle />
          </div>
        </div>
      </div>
    </aside>
  )
}
