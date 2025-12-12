"use client"

import { Lock, Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import { cn } from "@/lib/utils"
import type { SettingsFormData, PasswordVisibility } from "@/lib/settings-types"

interface SecuritySettingsProps {
  formData: SettingsFormData
  setFormData: (data: SettingsFormData) => void
  errors: Record<string, string>
  showPasswords: PasswordVisibility
  setShowPasswords: (show: PasswordVisibility) => void
}

export function SecuritySettings({
  formData,
  setFormData,
  errors,
  showPasswords,
  setShowPasswords,
}: SecuritySettingsProps) {
  const { onFocus: onCurrentPasswordFocus } = useFocusNarrator("Current password input field")
  const { onFocus: onNewPasswordFocus } = useFocusNarrator("New password input field")
  const { onFocus: onConfirmPasswordFocus } = useFocusNarrator("Confirm new password input field")
  const { onFocus: on2FAFocus } = useFocusNarrator(
    `Two-factor authentication is ${formData.twoFactorEnabled ? "enabled" : "disabled"}`,
  )

  return (
    <section aria-labelledby="security-heading" className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
          <Lock className="h-5 w-5 text-orange-600 dark:text-orange-400" aria-hidden="true" />
        </div>
        <div>
          <h2 id="security-heading" className="text-xl font-semibold">
            Security Settings
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage your password and security preferences</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="current-password" className="text-sm font-medium">
              Current Password
            </Label>
          </div>
          <div className="relative">
            <Input
              id="current-password"
              type={showPasswords.current ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              onFocus={onCurrentPasswordFocus}
              aria-invalid={!!errors.currentPassword}
              aria-describedby={errors.currentPassword ? "current-password-error" : undefined}
              className={cn("h-11 pr-10", errors.currentPassword && "border-destructive")}
              placeholder="Enter current password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
              aria-label={showPasswords.current ? "Hide current password" : "Show current password"}
            >
              {showPasswords.current ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
          {errors.currentPassword && (
            <p id="current-password-error" role="alert" className="mt-2 text-sm text-destructive font-medium">
              <span className="sr-only">Error:</span> {errors.currentPassword}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="new-password" className="text-sm font-medium">
              New Password
            </Label>
          </div>
          <div className="relative">
            <Input
              id="new-password"
              type={showPasswords.new ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              onFocus={onNewPasswordFocus}
              aria-invalid={!!errors.newPassword}
              aria-describedby={errors.newPassword ? "new-password-error" : "new-password-help"}
              className={cn("h-11 pr-10", errors.newPassword && "border-destructive")}
              placeholder="Enter new password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
              aria-label={showPasswords.new ? "Hide new password" : "Show new password"}
            >
              {showPasswords.new ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
          <p id="new-password-help" className="mt-2 text-xs text-muted-foreground">
            Must be at least 8 characters with letters and numbers
          </p>
          {errors.newPassword && (
            <p id="new-password-error" role="alert" className="mt-2 text-sm text-destructive font-medium">
              <span className="sr-only">Error:</span> {errors.newPassword}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Label htmlFor="confirm-password" className="text-sm font-medium">
              Confirm New Password
            </Label>
          </div>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showPasswords.confirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              onFocus={onConfirmPasswordFocus}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              className={cn("h-11 pr-10", errors.confirmPassword && "border-destructive")}
              placeholder="Confirm new password"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
              aria-label={showPasswords.confirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showPasswords.confirm ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p id="confirm-password-error" role="alert" className="mt-2 text-sm text-destructive font-medium">
              <span className="sr-only">Error:</span> {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <Label htmlFor="two-factor-switch" className="text-base font-semibold">
                  Two-Factor Authentication
                </Label>
                <p className="mt-1 text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
            </div>
            <Switch
              id="two-factor-switch"
              checked={formData.twoFactorEnabled}
              onCheckedChange={(checked) => setFormData({ ...formData, twoFactorEnabled: checked })}
              onFocus={on2FAFocus}
              aria-describedby="two-factor-help"
              className="mt-2"
            />
          </div>
          <p id="two-factor-help" className="sr-only">
            When enabled, you'll need to enter a code from your authenticator app to sign in
          </p>
        </div>
      </div>
    </section>
  )
}
