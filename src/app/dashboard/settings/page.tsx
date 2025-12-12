"use client"

import { useState } from "react"
import { Bell, Lock, User, Palette, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import { SaveStatusMessage } from "@/components/settings/save-status-message"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { SecuritySettings } from "@/components/settings/security-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { PreferencesSettings } from "@/components/settings/preferences-settings"
import type { SettingsFormData, PasswordVisibility } from "@/lib/settings-types"

export default function SettingsPage() {
  const [formData, setFormData] = useState<SettingsFormData>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    username: "johndoe",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    emailNotifications: true,
    pushNotifications: true,
    weeklyReport: false,
    productUpdates: true,
    language: "en",
    timezone: "est",
    theme: "system",
    dateFormat: "mm/dd/yyyy",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [showPasswords, setShowPasswords] = useState<PasswordVisibility>({
    current: false,
    new: false,
    confirm: false,
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }

    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required to change password"
      }
      if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters"
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    setSaved(false)
    setSaveError(null)

    if (!validateForm()) {
      setSaveError("Please fix the errors above before saving")
      return
    }

    setTimeout(() => {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 500)
  }

  const { onFocus: onHeaderFocus } = useFocusNarrator("Settings page, manage your account and preferences")
  const { onFocus: onSaveFocus } = useFocusNarrator("Save all settings changes")

  return (
    <div className=" bg-linear-to-br from-background via-background to-muted/20">
      <div className="mx-auto max-w-5xl space-y-8">
        <header
          tabIndex={0}
          onFocus={onHeaderFocus}
          className="rounded-xl bg-card/50 backdrop-blur-sm border border-border p-6 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className  ="mt-2 text-base text-muted-foreground">Manage your account settings and preferences</p>
        </header>

        <SaveStatusMessage saved={saved} error={saveError} />

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger
              value="profile"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-3"
            >
              <User className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-3"
            >
              <Lock className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-3"
            >
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-3"
            >
              <Palette className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
          </TabsList>

          <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 sm:p-8 shadow-sm">
            <TabsContent value="profile" className="mt-0">
              <ProfileSettings formData={formData} setFormData={setFormData} errors={errors} />
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <SecuritySettings
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                showPasswords={showPasswords}
                setShowPasswords={setShowPasswords}
              />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <NotificationSettings formData={formData} setFormData={setFormData} />
            </TabsContent>

            <TabsContent value="preferences" className="mt-0">
              <PreferencesSettings formData={formData} setFormData={setFormData} />
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex items-center justify-end gap-3 rounded-xl bg-card/50 backdrop-blur-sm border border-border p-4">
          <Button variant="outline" onClick={() => window.location.reload()} size="lg">
            Cancel
          </Button>
          <Button onClick={handleSave} onFocus={onSaveFocus} className="gap-2" size="lg">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}