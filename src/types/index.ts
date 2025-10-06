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

export interface Officer {
    first_name: string | null
    id: number
    is_active: number
    kode_desa: string | null;
    last_name: string | null;
    middle_name: string | null;
    name: string
}