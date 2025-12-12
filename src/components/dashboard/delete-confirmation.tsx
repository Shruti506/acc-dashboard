"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { AlertTriangle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import type { User } from "./users-table"

interface DeleteConfirmationProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  triggerRef?: React.RefObject<HTMLButtonElement | null>
}

export function DeleteConfirmation({ user, open, onOpenChange, onConfirm, triggerRef }: DeleteConfirmationProps) {
  const { onFocus: onCancelFocus } = useFocusNarrator("Cancel button. Keeps the user and closes this dialog")
  const { onFocus: onConfirmFocus } = useFocusNarrator(
    `Delete user button. Permanently removes ${user?.name || "this user"}`,
  )
  const cancelRef = useRef<HTMLButtonElement>(null)

  // Focus the cancel button when the dialog opens (safer default)
  useEffect(() => {
    if (open && cancelRef.current) {
      const timeout = setTimeout(() => {
        cancelRef.current?.focus()
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen)
    if (!newOpen && triggerRef?.current) {
      setTimeout(() => {
        triggerRef.current?.focus()
      }, 100)
    }
  }

  const handleConfirm = () => {
    onConfirm()
    // Focus will be handled by the parent component
  }

  if (!user) return null

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent
        role="alertdialog"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <AlertDialogTitle className="sr-only">
          Delete User
        </AlertDialogTitle>

        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10"
              aria-hidden="true"
            >
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>

            <span className="text-lg font-semibold" aria-hidden="true">
              Delete User
            </span>
          </div>
          <AlertDialogDescription id="delete-dialog-description">
            Are you sure you want to delete <strong>{user.name}</strong>? This action cannot be undone and will
            permanently remove all associated data including their profile, settings, and activity history.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            ref={cancelRef}
            onFocus={onCancelFocus}
            className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            onFocus={onConfirmFocus}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Delete User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}