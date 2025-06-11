import type { Role } from "@prisma/client";

export function roleUser(role: string) {
    let userRole: Role = "User"
    if (role === "user") {
        userRole = "User"
    }
    if (role === "admin") {
        userRole = "Admin"
    }

    return userRole;
}