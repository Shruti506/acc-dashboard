"use client"

import { createContext, useContext, useState, useMemo, ReactNode } from "react"
import { User } from "@/components/dashboard/users-table"
import { initialUsers } from "@/data/initial-users"

interface UserContextType {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>

  statusMessage: string
  setStatusMessage: React.Dispatch<React.SetStateAction<string>>

  stats: {
    total: number
    active: number
    inactive: number
    pending: number
  }
}

const UserContext = createContext<UserContextType | null>(null)

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [statusMessage, setStatusMessage] = useState("")

  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter(u => u.status === "active").length,
      inactive: users.filter(u => u.status === "inactive").length,
      pending: users.filter(u => u.status === "pending").length
    }),
    [users]
  )

  return (
    <UserContext.Provider
      value={{
        users,
        setUsers,
        statusMessage,
        setStatusMessage,
        stats
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserStore() {
  const ctx = useContext(UserContext)

  if (!ctx) {
    throw new Error("useUserStore must be used inside <UserProvider>")
  }

  return ctx
}
