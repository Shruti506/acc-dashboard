"use client"

import { useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"

interface ClientFocusManagerProps {
  children: ReactNode
}

/**
 * ClientFocusManager handles:
 * 1. Route change announcements for screen readers
 * 2. Focus management on navigation
 * 3. Keyboard trap escape handling
 */
export function ClientFocusManager({ children }: ClientFocusManagerProps) {
  const pathname = usePathname()

  // Announce route changes to screen readers
  useEffect(() => {
    const announcer = document.getElementById("route-announcer")
    if (announcer) {
      // Get page title or generate from pathname
      const pageTitle = document.title || pathname.split("/").pop() || "Page"
      announcer.textContent = `Navigated to ${pageTitle}`

      // Clear after announcement
      const timeout = setTimeout(() => {
        announcer.textContent = ""
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [pathname])

  // Handle focus on route change - focus main content
  useEffect(() => {
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      // Set tabindex temporarily to allow focus
      const hadTabIndex = mainContent.hasAttribute("tabindex")
      if (!hadTabIndex) {
        mainContent.setAttribute("tabindex", "-1")
      }

      // Focus after a short delay to ensure content is rendered
      const timeout = setTimeout(() => {
        mainContent.focus({ preventScroll: true })

        // Remove tabindex if we added it
        if (!hadTabIndex) {
          mainContent.removeAttribute("tabindex")
        }
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [pathname])

  // Global keyboard handling for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape key should close any open dialogs/sheets
      if (event.key === "Escape") {
        // Let the event bubble - handled by individual components
        return
      }

      // Handle focus visible for keyboard users
      if (event.key === "Tab") {
        document.body.classList.add("keyboard-navigation")
      }
    }

    const handleMouseDown = () => {
      document.body.classList.remove("keyboard-navigation")
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("mousedown", handleMouseDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  return <>{children}</>
}
