export type UserRole = "superadmin" | "admin" | "user"

export interface UserSession {
    id: string,
    name: string,
    role: Array<UserRole>,
    first_name: null,
    middle_name: null,
    last_name: null,
    kode_desa: null,
    nik: null,
    phone: null
}