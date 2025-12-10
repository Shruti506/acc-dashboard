"use client"

import type React from "react"

import { useCallback, useRef } from "react"

let useNarratorContext: () => { enabled: boolean; speak: (text: string) => void }

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const context = require("@/contexts/narrator-context")
  useNarratorContext = context.useNarratorContext
} catch {
  // Fallback if context is not available
  useNarratorContext = () => ({ enabled: false, speak: () => { } })
}

/**
 * Hook to narrate when an element receives focus
 * Useful for keyboard navigation where items are outlined/focused
 */
export function useFocusNarrator(label?: string) {
  const labelRef = useRef<string | undefined>(label)
  const narrator = useNarratorContext()

  // Update label ref when it changes
  if (label !== labelRef.current) {
    labelRef.current = label
  }

  // let lastInteractionWasKeyboard = false

  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "Tab") {
  //     lastInteractionWasKeyboard = true
  //   }
  // })

  // window.addEventListener("mousedown", () => {
  //   lastInteractionWasKeyboard = false
  // })


  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      if (!narrator.enabled) return

      // if (!lastInteractionWasKeyboard) return
      const element = event.currentTarget
      const ariaLabel = element.getAttribute("aria-label")
      const ariaLabelledBy = element.getAttribute("aria-labelledby")
      const textContent = element.textContent?.trim()
      const role = element.getAttribute("role")
      const tagName = element.tagName.toLowerCase()

      let narrationText = labelRef.current

      // Try to get label from aria-label
      if (!narrationText && ariaLabel) {
        narrationText = ariaLabel
      }

      // Try to get label from aria-labelledby
      if (!narrationText && ariaLabelledBy) {
        const labelElement = document.getElementById(ariaLabelledBy)
        if (labelElement) {
          narrationText = labelElement.textContent?.trim() || undefined
        }
      }

      // Try to get from text content (filter out icons and decorative elements)
      if (!narrationText && textContent) {
        narrationText = textContent
          .replace(/\s+/g, " ")
          .replace(/\[object Object\]/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .split("\n")[0]
          .trim()
      }

      if (!narrationText) {
        if (role) {
          narrationText = `${role} focused`
        } else if (tagName === "button") {
          narrationText = "Button"
        } else if (tagName === "a") {
          narrationText = "Link"
        } else if (tagName === "input") {
          const inputType = element.getAttribute("type") || "text"
          narrationText = `${inputType} input`
        } else {
          narrationText = "Item focused"
        }
      }

      if (narrationText && narrationText.length > 0) {
        narrator.speak(narrationText)
      }
    },
    [narrator],
  )

  return {
    onFocus: handleFocus,
    narratorEnabled: narrator.enabled,
  }
}
