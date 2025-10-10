import z from "zod";

export const loginAdminRegencySchema = z.object({
    name: z.string().min(3, "Username admin minimal 3 karakter"),
    password: z.string().min(6, "Password minimal 6 karakter"),
});

export const checkNikCitizenSchema = z.object({
    nik: z.string().min(3, "NIK harus terdiri dari 16 Karakter").max(16, "NIK harus terdiri dari 16 Karakter"),
    mother_name: z.string().min(3, "Nama Ibu Kandung minimal 3 karakter"),
    phone: z.string().min(9, "Nomor Whatsapp minimal 9 karakter"),
});

export const loginCitizenSchema = z.object({
    nik: z.string().min(3, "NIK harus terdiri dari 16 Karakter").max(16, "NIK harus terdiri dari 16 Karakter"),
    phone: z.string().min(9, "Nomor Whatsapp minimal 9 karakter"),
});

export const verifyOtpSchema = z.object({
    otp: z.string().min(6, "Masukkan OTP 6 digit").max(6, "Masukkan OTP 6 digit"),
});