"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import { UserFilters } from "@/components/dashboard/user-filters"
import { UsersTable, type User } from "@/components/dashboard/users-table"
import { Pagination } from "@/components/dashboard/pagination"
import { AddUserForm } from "@/components/dashboard/add-user-form"
import { DeleteConfirmation } from "@/components/dashboard/delete-confirmation"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Sample data
const initialUsers: User[] = [
    {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "admin",
        status: "active",
        lastActive: "2 hours ago",
    },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "editor", status: "active", lastActive: "5 hours ago" },
    {
        id: "3",
        name: "Carol Williams",
        email: "carol@example.com",
        role: "viewer",
        status: "inactive",
        lastActive: "3 days ago",
    },
    {
        id: "4",
        name: "David Brown",
        email: "david@example.com",
        role: "editor",
        status: "pending",
        lastActive: "1 day ago",
    },
    {
        id: "5",
        name: "Emma Davis",
        email: "emma@example.com",
        role: "viewer",
        status: "active",
        lastActive: "30 mins ago",
    },
    {
        id: "6",
        name: "Frank Miller",
        email: "frank@example.com",
        role: "admin",
        status: "active",
        lastActive: "1 hour ago",
    },
    {
        id: "7",
        name: "Grace Wilson",
        email: "grace@example.com",
        role: "viewer",
        status: "inactive",
        lastActive: "1 week ago",
    },
    {
        id: "8",
        name: "Henry Taylor",
        email: "henry@example.com",
        role: "editor",
        status: "active",
        lastActive: "4 hours ago",
    },
    {
        id: "9",
        name: "Ivy Anderson",
        email: "ivy@example.com",
        role: "viewer",
        status: "pending",
        lastActive: "2 days ago",
    },
    {
        id: "10",
        name: "Jack Thomas",
        email: "jack@example.com",
        role: "viewer",
        status: "active",
        lastActive: "15 mins ago",
    },
    {
        id: "11",
        name: "Kate Jackson",
        email: "kate@example.com",
        role: "editor",
        status: "active",
        lastActive: "6 hours ago",
    },
    {
        id: "12",
        name: "Leo White",
        email: "leo@example.com",
        role: "viewer",
        status: "inactive",
        lastActive: "2 weeks ago",
    },
]

const ITEMS_PER_PAGE = 5

export default function DashboardPage() {
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [searchTerm, setSearchTerm] = useState("")
    const [roleFilter, setRoleFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [statusMessage, setStatusMessage] = useState("")
    const [userToDelete, setUserToDelete] = useState<User | null>(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

    const deleteButtonRef = useRef<HTMLButtonElement>(null)

    // Filter users
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

    // Paginate users
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    }, [filteredUsers, currentPage])

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)

    // Stats
    const stats = useMemo(
        () => ({
            total: users.length,
            active: users.filter((u) => u.status === "active").length,
            inactive: users.filter((u) => u.status === "inactive").length,
            pending: users.filter((u) => u.status === "pending").length,
        }),
        [users],
    )

    // Handlers
    const handleApplyFilters = useCallback(() => {
        setCurrentPage(1)
        setStatusMessage(`Filters applied. Showing ${filteredUsers.length} result${filteredUsers.length !== 1 ? "s" : ""}.`)
    }, [filteredUsers.length])

    const handleResetFilters = useCallback(() => {
        setSearchTerm("")
        setRoleFilter("all")
        setStatusFilter("all")
        setCurrentPage(1)
        setStatusMessage("Filters reset. Showing all users.")
    }, [])

    const handleAddUser = useCallback((userData: { name: string; email: string; role: string }) => {
        const newUser: User = {
            id: String(Date.now()),
            name: userData.name,
            email: userData.email,
            role: userData.role as User["role"],
            status: "pending",
            lastActive: "Just now",
        }
        setUsers((prev) => [newUser, ...prev])
        setStatusMessage(`${userData.name} has been added successfully.`)
    }, [])

    const handleEditUser = useCallback((user: User) => {
        setStatusMessage(`Opening edit form for ${user.name}`)
        // Edit logic would go here
    }, [])

    const handleDeleteClick = useCallback((user: User) => {
        setUserToDelete(user)
        setDeleteDialogOpen(true)
    }, [])

    const handleDeleteConfirm = useCallback(() => {
        if (userToDelete) {
            setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id))
            setStatusMessage(`${userToDelete.name} has been deleted.`)
            setUserToDelete(null)
            setDeleteDialogOpen(false)
        }
    }, [userToDelete])

    const handlePageChange = useCallback(
        (page: number) => {
            setCurrentPage(page)
            setStatusMessage(`Navigated to page ${page} of ${totalPages}`)
            // Scroll to top of table
            document.getElementById("users-table-section")?.scrollIntoView({ behavior: "smooth" })
        },
        [totalPages],
    )

    return (
        <>
            {/* Live region for status messages - screen readers will announce changes */}
            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {statusMessage}
            </div>

            <div className="space-y-6">
                {/* Page header */}
                <section aria-labelledby="page-heading">
                    <h2 id="page-heading" className="sr-only">
                        Dashboard Overview
                    </h2>

                    {/* Stats Cards */}
                    <StatsCards
                        totalUsers={stats.total}
                        activeUsers={stats.active}
                        inactiveUsers={stats.inactive}
                        pendingUsers={stats.pending}
                    />
                </section>

                <Separator />

                {/* Users Section */}
                <section id="users-table-section" aria-labelledby="users-heading">
                    <Card>
                        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle id="users-heading" className="text-lg">
                                    Users
                                </CardTitle>
                                <CardDescription>Manage user accounts, roles, and permissions.</CardDescription>
                            </div>
                            <AddUserForm onAddUser={handleAddUser} />
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Filters */}
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

                            {/* Table */}
                            <UsersTable users={paginatedUsers} onEdit={handleEditUser} onDelete={handleDeleteClick} />

                            {/* Pagination */}
                            {filteredUsers.length > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalItems={filteredUsers.length}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </CardContent>
                    </Card>
                </section>
            </div>

            {/* Delete Confirmation Dialog */}
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
