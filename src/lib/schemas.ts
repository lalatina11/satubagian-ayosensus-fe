import z from "zod";

export const loginAdminRegencySchema = z.object({
    name: z.string().min(3, "Nama admin minimal 3 karakter"),
    password: z.string().min(6, "Password minimal 6 karakter"),
});