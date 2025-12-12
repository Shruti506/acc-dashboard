"use client"

import { Bell, Mail, Smartphone, TrendingUp, Sparkles } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import type { SettingsFormData } from "@/lib/settings-types"

interface NotificationSettingsProps {
  formData: SettingsFormData
  setFormData: (data: SettingsFormData) => void
}

export function NotificationSettings({ formData, setFormData }: NotificationSettingsProps) {
  const { onFocus: onEmailFocus } = useFocusNarrator(
    `Email notifications are ${formData.emailNotifications ? "enabled" : "disabled"}`,
  )
  const { onFocus: onPushFocus } = useFocusNarrator(
    `Push notifications are ${formData.pushNotifications ? "enabled" : "disabled"}`,
  )
  const { onFocus: onWeeklyFocus } = useFocusNarrator(
    `Weekly reports are ${formData.weeklyReport ? "enabled" : "disabled"}`,
  )
  const { onFocus: onUpdatesFocus } = useFocusNarrator(
    `Product updates are ${formData.productUpdates ? "enabled" : "disabled"}`,
  )

  return (
    <section aria-labelledby="notifications-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
          <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        </div>
        <div>
          <h2 id="notifications-heading" className="text-xl font-semibold">
            Notification Preferences
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Choose how you want to be notified about updates and activity
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/30">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <Label htmlFor="email-notifications" className="text-sm font-semibold cursor-pointer">
                Email Notifications
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">Receive email updates about your account activity</p>
            </div>
          </div>
          <Switch
            id="email-notifications"
            checked={formData.emailNotifications}
            onCheckedChange={(checked) => setFormData({ ...formData, emailNotifications: checked })}
            onFocus={onEmailFocus}
          />
        </div>

        <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/30">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
              <Smartphone className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <Label htmlFor="push-notifications" className="text-sm font-semibold cursor-pointer">
                Push Notifications
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">Get instant alerts on your device</p>
            </div>
          </div>
          <Switch
            id="push-notifications"
            checked={formData.pushNotifications}
            onCheckedChange={(checked) => setFormData({ ...formData, pushNotifications: checked })}
            onFocus={onPushFocus}
          />
        </div>

        <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/30">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <Label htmlFor="weekly-report" className="text-sm font-semibold cursor-pointer">
                Weekly Activity Report
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Receive a summary of your weekly activity every Monday
              </p>
            </div>
          </div>
          <Switch
            id="weekly-report"
            checked={formData.weeklyReport}
            onCheckedChange={(checked) => setFormData({ ...formData, weeklyReport: checked })}
            onFocus={onWeeklyFocus}
          />
        </div>

        <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/30">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
              <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <Label htmlFor="product-updates" className="text-sm font-semibold cursor-pointer">
                Product Updates
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">Stay informed about new features and improvements</p>
            </div>
          </div>
          <Switch
            id="product-updates"
            checked={formData.productUpdates}
            onCheckedChange={(checked) => setFormData({ ...formData, productUpdates: checked })}
            onFocus={onUpdatesFocus}
          />
        </div>
      </div>
    </section>
  )
}
