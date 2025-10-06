"use server"

import z from "zod"
import { ENV } from "./env"
import { loginAdminRegencySchema } from "./schemas"
import { cookies } from "next/headers"
import { AdminRegencySession } from "@/types"

export const handleLoginAdminRegency = async (values: z.infer<typeof loginAdminRegencySchema>) => {
    const cookie = await cookies()
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/v1/login`, { method: "POST", body: JSON.stringify(values), headers: { "Content-Type": "application/json" } })
    const result = await res.json()
    if (result.error) {
        throw new Error(result.error || "Something went wrong!")
    }
    console.log(result);
    cookie.set("access_token", result.access_token, { path: "/", maxAge: 60 * 60 * 24 * 2, httpOnly: true, sameSite: "lax", secure: ENV.NODE_ENV === "production" })
}

export const getAdminRegencyAuthInfo = async () => {
    const cookie = await cookies()
    const token = await cookie.get("access_token")?.value
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/v1/me`, { headers: { Authorization: `Bearer ${token}` } })
    if (!res.ok) return null
    return await res.json() as AdminRegencySession

}
export const handleLogOutAdminRegency = async () => {
    const cookie = await cookies()
    const token = await cookie.get("access_token")?.value
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/v1/logout`, { method: "POST", headers: { Authorization: `Bearer ${token}` } })
    const result = await res.json()
    if (result.error) {
        throw new Error(result.error || "Something went wrong!")
    }
    cookie.delete("access_token")
}