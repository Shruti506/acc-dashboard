"use client"

import type React from "react"
import { useCallback, useEffect, useRef } from "react"

let useNarratorContext: () => { enabled: boolean; speak: (text: string) => void }

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const context = require("@/contexts/narrator-context")
  useNarratorContext = context.useNarratorContext
} catch {
  useNarratorContext = () => ({ enabled: false, speak: () => { } })
}

export function useFocusNarrator(label?: string) {
  const labelRef = useRef(label)
  const narrator = useNarratorContext()

  if (label !== labelRef.current) {
    labelRef.current = label
  }

  const lastInteractionWasKeyboard = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") lastInteractionWasKeyboard.current = true
    }

    const handleMouseDown = () => {
      lastInteractionWasKeyboard.current = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("mousedown", handleMouseDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      if (!narrator.enabled) return
      if (!lastInteractionWasKeyboard.current) return

      const element = event.currentTarget
      const ariaLabel = element.getAttribute("aria-label")
      const ariaLabelledBy = element.getAttribute("aria-labelledby")
      const textContent = element.textContent?.trim()
      const role = element.getAttribute("role")
      const tagName = element.tagName.toLowerCase()

      let narrationText = labelRef.current

      if (!narrationText && ariaLabel) narrationText = ariaLabel

      if (!narrationText && ariaLabelledBy) {
        const el = document.getElementById(ariaLabelledBy)
        if (el) narrationText = el.textContent?.trim() || undefined
      }

      if (!narrationText && textContent) {
        narrationText = textContent
          .replace(/\s+/g, " ")
          .replace(/\[object Object\]/g, "")
          .trim()
          .split("\n")[0]
          .trim()
      }

      if (!narrationText) {
        if (role) narrationText = `${role} focused`
        else if (tagName === "button") narrationText = "Button"
        else if (tagName === "a") narrationText = "Link"
        else if (tagName === "input")
          narrationText = `${element.getAttribute("type") || "text"} input`
        else narrationText = "Item focused"
      }

      if (narrationText) narrator.speak(narrationText)
    },
    [narrator]
  )

  return {
    onFocus: handleFocus,
    narratorEnabled: narrator.enabled,
  }
}
