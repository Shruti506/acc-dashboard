"use client"

import { Search, Filter, RotateCcw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFocusNarrator } from "@/hooks/use-focus-narrator"

interface UserFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  roleFilter: string
  onRoleChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  onApplyFilters: () => void
  onResetFilters: () => void
}

export function UserFilters({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleChange,
  statusFilter,
  onStatusChange,
  onApplyFilters,
  onResetFilters,
}: UserFiltersProps) {
  const { onFocus: onSearchFocus } = useFocusNarrator("Search input. Type to search users by name or email")
  const { onFocus: onRoleFocus } = useFocusNarrator(
    roleFilter && roleFilter !== "all"
      ? `Role: ${roleFilter}. Select to change.`
      : "Role:  Select a role."
  );

  const { onFocus: onStatusFocus } = useFocusNarrator(
    statusFilter && statusFilter !== "all"
      ? `Status: ${statusFilter}. Select to change.`
      : "Status:  Select a status."
  );

  const { onFocus: onApplyFocus } = useFocusNarrator("Apply filters button")
  const { onFocus: onResetFocus } = useFocusNarrator("Reset filters button. Clears all filter selections")

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onApplyFilters()
      }}
      className="space-y-4"
      role="search"
      aria-label="Filter users"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div className="space-y-2">
          <Label htmlFor="search-users" className="text-sm font-medium">
            Search
          </Label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <Input
              id="search-users"
              type="search"
              placeholder="Name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={onSearchFocus}
              className="pl-9 focus-visible:ring-2 focus-visible:ring-ring"
              aria-describedby="search-hint"
              autoComplete="off"
            />
          </div>
          <p id="search-hint" className="sr-only">
            Enter a name or email address to search for users
          </p>
        </div>

        {/* Role Filter */}
        <div className="space-y-2">
          <Label htmlFor="role-filter" className="text-sm font-medium">
            Role
          </Label>
          <Select value={roleFilter} onValueChange={onRoleChange}>
            <SelectTrigger
              id="role-filter"
              onFocus={onRoleFocus}
              className="focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by role"
            >
              <SelectValue placeholder="All roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status-filter" className="text-sm font-medium">
            Status
          </Label>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger
              id="status-filter"
              onFocus={onStatusFocus}
              className="focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by status"
            >
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-end gap-2">
          <Button
            type="submit"
            onFocus={onApplyFocus}
            className="flex-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Apply</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onResetFilters}
            onFocus={onResetFocus}
            className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-transparent"
            aria-label="Reset all filters"
          >
            <RotateCcw className="h-4 w-4 sm:mr-2" aria-hidden="true" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
