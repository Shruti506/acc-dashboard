"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"

interface NarratorContextType {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  speak: (text: string) => void
}

const NarratorContext = createContext<NarratorContextType | null>(null)

export function useNarratorContext() {
  const context = useContext(NarratorContext)
  if (!context) {
    throw new Error("useNarratorContext must be used within a NarratorProvider")
  }
  return context
}

export function NarratorProvider({
  children,
  defaultEnabled = true,
}: {
  children: ReactNode
  defaultEnabled?: boolean
}) {
  const [enabled, setEnabled] = useState(defaultEnabled)
  const [speechAvailable, setSpeechAvailable] = useState(false)

  // Check if speech synthesis is available on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSpeechAvailable(true)
    }
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (!enabled || !speechAvailable || typeof window === "undefined") return

      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1
      utterance.pitch = 1
      utterance.volume = 1

      // Use a slight delay to ensure previous speech is cancelled
      setTimeout(() => {
        window.speechSynthesis.speak(utterance)
      }, 50)
    },
    [enabled, speechAvailable],
  )

  return <NarratorContext.Provider value={{ enabled, setEnabled, speak }}>{children}</NarratorContext.Provider>
}
