import { Role } from "@prisma/client";

export function roleUser(role: string , existingRole : string | undefined) {
    let userRole: Role = "User"
    if (role === "user") {
        userRole = "User"
    }
    if (role === "admin") {
        userRole = "Admin"
    } else {
        userRole = existingRole as Role
    }

    return userRole;
}