"use client"

import { User, Mail, AtSign, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import { cn } from "@/lib/utils"
import type { SettingsFormData } from "@/lib/settings-types"

interface ProfileSettingsProps {
  formData: SettingsFormData
  setFormData: (data: SettingsFormData) => void
  errors: Record<string, string>
}

export function ProfileSettings({ formData, setFormData, errors }: ProfileSettingsProps) {
  const { onFocus: onFullNameFocus } = useFocusNarrator("Full name input field")
  const { onFocus: onEmailFocus } = useFocusNarrator("Email address input field")
  const { onFocus: onUsernameFocus } = useFocusNarrator("Username input field")
  const { onFocus: onBioFocus } = useFocusNarrator("Bio text area")

  return (
    <section aria-labelledby="profile-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <User className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h2 id="profile-heading" className="text-xl font-semibold">
            Profile Information
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Update your personal information and public profile</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="full-name" className="text-sm font-medium">
              Full Name{" "}
              <span className="text-destructive" aria-label="required">
                *
              </span>
            </Label>
          </div>
          <Input
            id="full-name"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            onFocus={onFullNameFocus}
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "full-name-error" : undefined}
            className={cn("h-11", errors.fullName && "border-destructive focus-visible:ring-destructive")}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p id="full-name-error" role="alert" className="mt-2 text-sm text-destructive font-medium">
              <span className="sr-only">Error:</span> {errors.fullName}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address{" "}
              <span className="text-destructive" aria-label="required">
                *
              </span>
            </Label>
          </div>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onFocus={onEmailFocus}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn("h-11", errors.email && "border-destructive focus-visible:ring-destructive")}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-2 text-sm text-destructive font-medium">
              <span className="sr-only">Error:</span> {errors.email}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AtSign className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="username" className="text-sm font-medium">
              Username{" "}
              <span className="text-destructive" aria-label="required">
                *
              </span>
            </Label>
          </div>
          <Input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            onFocus={onUsernameFocus}
            aria-required="true"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "username-error" : "username-help"}
            className="h-11"
            placeholder="Enter username"
          />
          <p id="username-help" className="mt-2 text-xs text-muted-foreground">
            Your unique identifier for login
          </p>
          {errors.username && (
            <p id="username-error" role="alert" className="mt-2 text-sm text-destructive font-medium">
              <span className="sr-only">Error:</span> {errors.username}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="bio" className="text-sm font-medium">
              Bio
            </Label>
          </div>
          <textarea
            id="bio"
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            onFocus={onBioFocus}
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Tell us about yourself..."
            aria-describedby="bio-help"
          />
          <p id="bio-help" className="mt-2 text-xs text-muted-foreground">
            Brief description for your profile. Maximum 500 characters.
          </p>
        </div>
      </div>
    </section>
  )
}
