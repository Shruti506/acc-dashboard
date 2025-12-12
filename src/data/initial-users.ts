import { User } from "@/components/dashboard/users-table"

export const initialUsers: User[] = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin", status: "active", lastActive: "2 hours ago" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "editor", status: "active", lastActive: "5 hours ago" },
    { id: "3", name: "Carol Williams", email: "carol@example.com", role: "viewer", status: "inactive", lastActive: "3 days ago" },
    { id: "4", name: "David Brown", email: "david@example.com", role: "editor", status: "pending", lastActive: "1 day ago" },
    { id: "5", name: "Emma Davis", email: "emma@example.com", role: "viewer", status: "active", lastActive: "30 mins ago" },
    { id: "6", name: "Frank Miller", email: "frank@example.com", role: "admin", status: "active", lastActive: "1 hour ago" },
    { id: "7", name: "Grace Wilson", email: "grace@example.com", role: "viewer", status: "inactive", lastActive: "1 week ago" },
    { id: "8", name: "Henry Taylor", email: "henry@example.com", role: "editor", status: "active", lastActive: "4 hours ago" },
    { id: "9", name: "Ivy Anderson", email: "ivy@example.com", role: "viewer", status: "pending", lastActive: "2 days ago" },
    { id: "10", name: "Jack Thomas", email: "jack@example.com", role: "viewer", status: "active", lastActive: "15 mins ago" },
    { id: "11", name: "Kate Jackson", email: "kate@example.com", role: "editor", status: "active", lastActive: "6 hours ago" },
    { id: "12", name: "Leo White", email: "leo@example.com", role: "viewer", status: "inactive", lastActive: "2 weeks ago" },
]
