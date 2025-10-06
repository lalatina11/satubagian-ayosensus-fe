import { UserRole } from "@/types";

export const getRoleFromSession = (role: Array<UserRole> | undefined): UserRole => {
    if (!role) return "user"
    const isSuperAdmin = role?.includes("superadmin");
    const isAdmin =
        role.includes("admin") &&
        !role.includes("superadmin");
    if (isSuperAdmin) return "superadmin"
    if (isAdmin) return "admin"
    return "user"
}