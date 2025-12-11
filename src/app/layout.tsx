import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins, Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NarratorProvider } from "@/contexts/narrator-context"
import "./globals.css"
import { ClientFocusManager } from "@/components/client-focus-manager"
import { SkipToContent } from "@/components/skip-to-content"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Accessible Dashboard - User Management",
  description:
    "A fully WCAG 2.1 AA compliant admin dashboard for managing users, built with Next.js, TypeScript, and Tailwind CSS.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f9" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <div aria-live="polite" aria-atomic="true" className="sr-only" id="route-announcer" />

        <NarratorProvider defaultEnabled={true}>
          <SkipToContent />
          <ClientFocusManager>{children}</ClientFocusManager>
        </NarratorProvider>
        <Analytics />
      </body>
    </html>
  )
}
