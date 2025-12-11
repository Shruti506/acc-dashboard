"use client"

import { Edit, Trash2, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"
import { cn } from "@/lib/utils"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "editor" | "viewer"
  status: "active" | "inactive" | "pending"
  lastActive: string
}

interface UsersTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

const statusConfig = {
  active: {
    label: "Active",
    icon: CheckCircle,
    className: "bg-secondary/20 text-secondary-foreground border-secondary",
  },
  inactive: {
    label: "Inactive",
    icon: XCircle,
    className: "bg-destructive/20 text-destructive border-destructive",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-accent/20 text-accent-foreground border-accent",
  },
}

const roleConfig = {
  admin: "bg-primary/20 text-primary-foreground border-primary",
  editor: "bg-secondary/20 text-secondary-foreground border-secondary",
  viewer: "bg-muted text-muted-foreground border-border",
}

export function UsersTable({ users, onEdit, onDelete }: UsersTableProps) {

  const tableNarration = users.length
    ? users
      .map(
        (u, i) =>
          `Row ${i + 1}: ${u.name}, email ${u.email}, role ${u.role}, status ${u.status}, last active ${u.lastActive}.`
      )
      .join(" ")
    : "No users found."

  return (
    <div
      className="overflow-x-auto rounded-lg border border-border"
      tabIndex={0}
      aria-label="Users table with user names, emails, roles, status, and activity"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {tableNarration}
      </div>

      <table className="w-full border-collapse" role="table" aria-label="Users table">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
            <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-foreground">Email</th>
            <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-foreground">Role</th>
            <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
            <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-foreground">Last Active</th>
            <th scope="col" className="px-4 py-3 text-right text-sm font-semibold text-foreground">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                No users found matching your criteria.
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <UserRow
                key={user.id}
                user={user}
                rowIndex={index + 1}
                totalRows={users.length}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

function UserRow({
  user,
  onEdit,
  onDelete,
  rowIndex,
  totalRows,
}: {
  user: User
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  rowIndex: number
  totalRows: number
}) {

  const status = statusConfig[user.status]
  const StatusIcon = status.icon

  // 🔊 Cell narrations
  const { onFocus: onNameFocus } = useFocusNarrator(
    `Row ${rowIndex}, Name: ${user.name}`
  )
  const { onFocus: onEmailFocus } = useFocusNarrator(
    `Row ${rowIndex}, Email: ${user.email}`
  )
  const { onFocus: onRoleFocus } = useFocusNarrator(
    `Row ${rowIndex}, Role: ${user.role}`
  )
  const { onFocus: onStatusFocus } = useFocusNarrator(
    `Row ${rowIndex}, Status: ${user.status}`
  )
  const { onFocus: onLastActiveFocus } = useFocusNarrator(
    `Row ${rowIndex}, Last active: ${user.lastActive}`
  )

  // 🔊 Button narrations
  const { onFocus: onEditFocus } = useFocusNarrator(`Edit ${user.name}`)
  const { onFocus: onDeleteFocus } = useFocusNarrator(`Delete ${user.name}`)

  return (
    <tr className="border-b border-border hover:bg-muted/30 transition-colors">

      {/* NAME CELL */}
      <td
        tabIndex={0}
        onFocus={onNameFocus}
        scope="row"
        className="px-4 py-3 text-sm font-medium text-foreground"
      >
        {user.name}
      </td>

      {/* EMAIL CELL */}
      <td
        tabIndex={0}
        onFocus={onEmailFocus}
        className="px-4 py-3 text-sm text-muted-foreground"
      >
        {user.email}
      </td>

      {/* ROLE CELL */}
      <td tabIndex={0} onFocus={onRoleFocus} className="px-4 py-3">
        <Badge variant="outline" className={cn("text-xs", roleConfig[user.role])}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Badge>
      </td>

      {/* STATUS CELL */}
      <td tabIndex={0} onFocus={onStatusFocus} className="px-4 py-3">
        <Badge variant="outline" className={cn("inline-flex items-center gap-1 text-xs", status.className)}>
          <StatusIcon className="h-3 w-3" aria-hidden="true" />
          <span>{status.label}</span>
        </Badge>
      </td>

      {/* LAST ACTIVE CELL */}
      <td
        tabIndex={0}
        onFocus={onLastActiveFocus}
        className="px-4 py-3 text-sm text-muted-foreground"
      >
        {user.lastActive}
      </td>

      {/* ACTION BUTTONS */}
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2" role="group">

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(user)}
            onFocus={onEditFocus}
            aria-label={`Edit ${user.name}`}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(user)}
            onFocus={onDeleteFocus}
            aria-label={`Delete ${user.name}`}
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

        </div>
      </td>
    </tr>
  )
}
