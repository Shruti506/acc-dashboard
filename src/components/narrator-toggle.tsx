"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"

let useNarratorContext: () => { enabled: boolean; setEnabled: (enabled: boolean) => void }

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const context = require("@/contexts/narrator-context")
  useNarratorContext = context.useNarratorContext
} catch {
  useNarratorContext = () => ({ enabled: false, setEnabled: () => {} })
}

export function NarratorToggle() {
  const { enabled, setEnabled } = useNarratorContext()
  const { onFocus } = useFocusNarrator(enabled ? "Disable narrator, currently on" : "Enable narrator, currently off")

  const handleClick = () => {
    setEnabled(!enabled)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      onFocus={onFocus}
      aria-label={enabled ? "Disable narrator" : "Enable narrator"}
      aria-pressed={enabled}
      className="relative focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {enabled ? (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      ) : (
        <VolumeX className="h-4 w-4" aria-hidden="true" />
      )}
      <span className="sr-only">{enabled ? "Narrator is on" : "Narrator is off"}</span>
    </Button>
  )
}
