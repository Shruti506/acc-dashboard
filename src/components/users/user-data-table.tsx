"use client"

import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { AddUserForm } from '../dashboard/add-user-form'
import { UserFilters } from '../dashboard/user-filters'
import { User, UsersTable } from '../dashboard/users-table'
import { Pagination } from '../dashboard/pagination'
import { DeleteConfirmation } from '../dashboard/delete-confirmation'
import { useUserStore } from '@/contexts/user-context'
import { PageHeader } from '../common/page-header'
import { Users } from 'lucide-react'
import { useFocusNarrator } from '@/hooks/use-focus-narrator'


const ITEMS_PER_PAGE = 5

export default function UserTable() {
  const { users, setUsers, setStatusMessage } = useUserStore()

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const deleteButtonRef = useRef<HTMLButtonElement>(null)

  const { onFocus: onHeaderFocus } = useFocusNarrator("Users page, Manage all registered users ")

  // FILTERED USERS
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = roleFilter === "all" || user.role === roleFilter
      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [users, searchTerm, roleFilter, statusFilter])

  // PAGINATION
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredUsers, currentPage])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)

  // HANDLERS
  const handleApplyFilters = () => {
    setCurrentPage(1)
    setStatusMessage(`Filters applied. Showing ${filteredUsers.length} results.`)
  }

  const handleAddUser = (userData: { name: string; email: string; role: string }) => {
    const newUser: User = {
      id: String(Date.now()),
      name: userData.name,
      email: userData.email,
      role: userData.role as User["role"],
      status: "pending",
      lastActive: "Just now",
    }

    setUsers((prev) => [newUser, ...prev])
    setStatusMessage(`${userData.name} added successfully.`)
  }

  const handleResetFilters = () => {
    setSearchTerm("")
    setRoleFilter("all")
    setStatusFilter("all")
    setCurrentPage(1)
    setStatusMessage("Filters reset. Showing all users.")
  }

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id))
      setStatusMessage(`${userToDelete.name} has been deleted.`)
      setUserToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <section id="users-table-section" className='mx-auto max-w-7xl space-y-8'>
        <PageHeader
          title="Users"
          description="Manage all registered users and their permissions"
          icon={<Users className="h-6 w-6 text-primary" aria-hidden="true" />}
          onFocus={onHeaderFocus}
          actions={
            <AddUserForm onAddUser={handleAddUser} />
          }
        />

        <Card>
          <CardContent className="space-y-6">
            <UserFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              roleFilter={roleFilter}
              onRoleChange={setRoleFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />

            <UsersTable
              users={paginatedUsers}
              onEdit={() => { }}
              onDelete={(user) => {
                setUserToDelete(user)
                setDeleteDialogOpen(true)
              }}
            />

            {filteredUsers.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredUsers.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            )}
          </CardContent>
        </Card>
      </section>

      <DeleteConfirmation
        user={userToDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        triggerRef={deleteButtonRef}
      />
    </>
  )
}