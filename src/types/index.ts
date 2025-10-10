import z from "zod";
import { familyDataSchema } from "@/lib/schemas";

export type UserRole = "superadmin" | "verifier" | "admin" | "user";

export interface UserSession {
    id: string;
    name: string;
    role: Array<UserRole>;
    first_name: null;
    middle_name: null;
    last_name: null;
    kode_desa: null;
    nik: null;
    phone: null;
    household_id: number
}

export interface Officer {
    first_name: string | null;
    id: number;
    is_active: number;
    kode_desa: string | null;
    last_name: string | null;
    middle_name: string | null;
    name: string;
}

export type Village = {
    kode: number;
    name: string;
    subdistrict: string;
    subdistrict_kode: number;
};

export type ActionResponse<T> = {
    error: boolean;
    data?: T;
    message: string;
};

export type FamilyData = z.infer<typeof familyDataSchema>

export interface FamilyMemberType {
    id: number;
    household_id: number;
    full_name: string;
    nik: string;
    address: string | null;
    stay: number;
    gender: string;
    birth_place: string | null;
    birth_date: string;
    nationality: string | null;
    tribes: string | null;
    religion: string | null;
    used_language: string | null;
    family_status: string | null;
    marital_status: string | null;
    created_at: string;
    updated_at: string;
}