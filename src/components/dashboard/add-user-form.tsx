"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"

interface FormErrors {
  name?: string
  email?: string
  role?: string
}

interface AddUserFormProps {
  onAddUser: (user: { name: string; email: string; role: string }) => void
}

export function AddUserForm({ onAddUser }: AddUserFormProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const triggerRef = useRef<HTMLButtonElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  const { onFocus: onTriggerFocus } = useFocusNarrator("Add new user button. Opens a dialog form")
  const { onFocus: onNameFocus } = useFocusNarrator("Full name input field, required")
  const { onFocus: onEmailFocus } = useFocusNarrator("Email address input field, required")
  const { onFocus: onRoleFocus } = useFocusNarrator("Role selection dropdown, required")
  const { onFocus: onSubmitFocus } = useFocusNarrator("Add user button. Submits the form")
  const { onFocus: onCancelFocus } = useFocusNarrator("Cancel button. Closes the dialog without saving")

  useEffect(() => {
    if (open && firstInputRef.current) {
      const timeout = setTimeout(() => {
        firstInputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [open])

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required"
        if (value.trim().length < 2) return "Name must be at least 2 characters"
        break
      case "email":
        if (!value.trim()) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address"
        break
      case "role":
        if (!value) return "Please select a role"
        break
    }
    return undefined
  }

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: FormErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      role: validateField("role", role),
    }

    setErrors(newErrors)
    setTouched({ name: true, email: true, role: true })

    // Check if there are any errors
    if (Object.values(newErrors).some(Boolean)) {
      // Focus the first field with an error
      const firstErrorField = Object.keys(newErrors).find((key) => newErrors[key as keyof FormErrors])
      if (firstErrorField) {
        document.getElementById(`add-user-${firstErrorField}`)?.focus()
      }
      return
    }

    onAddUser({ name: name.trim(), email: email.trim(), role })
    resetForm()
    setOpen(false)

    setTimeout(() => {
      triggerRef.current?.focus()
    }, 100)
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setRole("")
    setErrors({})
    setTouched({})
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      resetForm()
      // Return focus to trigger
      setTimeout(() => {
        triggerRef.current?.focus()
      }, 100)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          ref={triggerRef}
          onFocus={onTriggerFocus}
          className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Add User</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" aria-describedby="add-user-description">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription id="add-user-description">
            Fill in the details below to add a new user to the system. All fields marked with an asterisk are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="add-user-name" className="text-sm font-medium">
              Full Name{" "}
              <span aria-hidden="true" className="text-destructive">
                *
              </span>
              <span className="sr-only">(required)</span>
            </Label>
            <Input
              ref={firstInputRef}
              id="add-user-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur("name", name)}
              onFocus={onNameFocus}
              aria-required="true"
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={errors.name ? "name-error" : "name-hint"}
              className="focus-visible:ring-2 focus-visible:ring-ring"
              autoComplete="name"
              placeholder="Enter full name"
            />
            <p id="name-hint" className="sr-only">
              Enter the user's full name, minimum 2 characters
            </p>
            {touched.name && errors.name && (
              <p id="name-error" className="text-sm text-destructive" role="alert" aria-live="assertive">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="add-user-email" className="text-sm font-medium">
              Email Address{" "}
              <span aria-hidden="true" className="text-destructive">
                *
              </span>
              <span className="sr-only">(required)</span>
            </Label>
            <Input
              id="add-user-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email", email)}
              onFocus={onEmailFocus}
              aria-required="true"
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={errors.email ? "email-error" : "email-hint"}
              className="focus-visible:ring-2 focus-visible:ring-ring"
              autoComplete="email"
              placeholder="user@example.com"
            />
            <p id="email-hint" className="sr-only">
              Enter a valid email address
            </p>
            {touched.email && errors.email && (
              <p id="email-error" className="text-sm text-destructive" role="alert" aria-live="assertive">
                {errors.email}
              </p>
            )}
          </div>

          {/* Role Field */}
          <div className="space-y-2">
            <Label htmlFor="add-user-role" className="text-sm font-medium">
              Role{" "}
              <span aria-hidden="true" className="text-destructive">
                *
              </span>
              <span className="sr-only">(required)</span>
            </Label>
            <Select
              value={role}
              onValueChange={(value) => {
                setRole(value)
                if (touched.role) {
                  setErrors((prev) => ({ ...prev, role: validateField("role", value) }))
                }
              }}
            >
              <SelectTrigger
                id="add-user-role"
                onFocus={onRoleFocus}
                onBlur={() => handleBlur("role", role)}
                aria-required="true"
                aria-invalid={touched.role && !!errors.role}
                aria-describedby={errors.role ? "role-error" : "role-hint"}
                className="focus-visible:ring-2 focus-visible:ring-ring"
              >
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin - Full access</SelectItem>
                <SelectItem value="editor">Editor - Can edit content</SelectItem>
                <SelectItem value="viewer">Viewer - Read only access</SelectItem>
              </SelectContent>
            </Select>
            <p id="role-hint" className="sr-only">
              Select the permission level for this user
            </p>
            {touched.role && errors.role && (
              <p id="role-error" className="text-sm text-destructive" role="alert" aria-live="assertive">
                {errors.role}
              </p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              onFocus={onCancelFocus}
              className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onFocus={onSubmitFocus}
              className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Add User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
