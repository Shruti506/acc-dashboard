"use client"

import { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"
import { NarratorToggle } from "@/components/narrator-toggle"

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar - hidden on mobile */}
            <AppSidebar />

            {/* Main content area */}
            <div className="flex-1 md:ml-64">
                {/* Header */}
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

                {/* Main content */}
                <main id="main-content" className="h-full p-4 sm:p-6 lg:p-8" tabIndex={-1}>
                    {children}
                </main>

                {/* Footer */}
                {/* <footer className="border-t border-border py-6 px-4 sm:px-6 lg:px-8" role="contentinfo">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                        <p>© 2025 Admin Panel. All rights reserved.</p>
                        <nav aria-label="Footer navigation">
                            <ul className="flex gap-4" role="list">
                                <li>
                                    <a
                                        href="#privacy"
                                        className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#terms"
                                        className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#accessibility"
                                        className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                                    >
                                        Accessibility
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer> */}
            </div>
        </div>
    )
}
