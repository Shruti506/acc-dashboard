export interface SettingsFormData {
    // Profile
    fullName: string
    email: string
    username: string
    bio: string

    // Security
    currentPassword: string
    newPassword: string
    confirmPassword: string
    twoFactorEnabled: boolean

    // Notifications
    emailNotifications: boolean
    pushNotifications: boolean
    weeklyReport: boolean
    productUpdates: boolean

    // Preferences
    language: string
    timezone: string
    theme: string
    dateFormat: string
}

export interface PasswordVisibility {
    current: boolean
    new: boolean
    confirm: boolean
}
