"use client"

import { Palette, Globe, Clock, Calendar } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import type { SettingsFormData } from "@/lib/settings-types"

interface PreferencesSettingsProps {
  formData: SettingsFormData
  setFormData: (data: SettingsFormData) => void
}

export function PreferencesSettings({ formData, setFormData }: PreferencesSettingsProps) {
  const { onFocus: onLanguageFocus } = useFocusNarrator("Language selection")
  const { onFocus: onTimezoneFocus } = useFocusNarrator("Timezone selection")
  const { onFocus: onThemeFocus } = useFocusNarrator("Theme selection")
  const { onFocus: onDateFormatFocus } = useFocusNarrator("Date format selection")

  return (
    <section aria-labelledby="preferences-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
          <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
        </div>
        <div>
          <h2 id="preferences-heading" className="text-xl font-semibold">
            Preferences
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Customize your experience with language, timezone, and display settings
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="language-select" className="text-sm font-medium">
              Language
            </Label>
          </div>
          <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
            <SelectTrigger id="language-select" onFocus={onLanguageFocus} className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="timezone-select" className="text-sm font-medium">
              Timezone
            </Label>
          </div>
          <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
            <SelectTrigger id="timezone-select" onFocus={onTimezoneFocus} className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">UTC</SelectItem>
              <SelectItem value="est">Eastern Time (EST)</SelectItem>
              <SelectItem value="cst">Central Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Time (PST)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="theme-select" className="text-sm font-medium">
              Theme
            </Label>
          </div>
          <Select value={formData.theme} onValueChange={(value) => setFormData({ ...formData, theme: value })}>
            <SelectTrigger id="theme-select" onFocus={onThemeFocus} className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="date-format-select" className="text-sm font-medium">
              Date Format
            </Label>
          </div>
          <Select
            value={formData.dateFormat}
            onValueChange={(value) => setFormData({ ...formData, dateFormat: value })}
          >
            <SelectTrigger id="date-format-select" onFocus={onDateFormatFocus} className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
              <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
              <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}
