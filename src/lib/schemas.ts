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

export const housingSchema = z.object({
    ownership_status: z.string().min(1, "Status Kepemilikan harus terdiri dari 1 karakter").max(20, "Status Kepemilikan harus terdiri dari 20 karakter").optional().or(z.literal("")),
    electricity: z.string().min(1, "Keterangan listrik harus terdiri dari 1 karakter").max(20, "Keterangan listrik harus terdiri dari 20 karakter").optional().or(z.literal("")),
    water: z.string().min(1, "Keterangan air harus terdiri dari 1 karakter").max(20, "Keterangan air harus terdiri dari 20 karakter").optional().or(z.literal("")),
    toilet: z.string().min(1, "Keterangan kamar mandi harus terdiri dari 1 karakter").max(20, "Keterangan kamar mandi harus terdiri dari 20 karakter").optional().or(z.literal("")),
    floor: z.string().min(1, "Keterangan lantai harus terdiri dari 1 karakter").max(20, "Keterangan lantai harus terdiri dari 20 karakter").optional().or(z.literal("")),
});

export const familyDataSchema = z.object({
    no_kk: z.string().min(16, "No KK 16 harus Digit").max(16, "No KK 16 harus Digit"),
    address: z.string().min(3, "Isi Alamat minimal 3 karakter").optional().or(z.literal("")),
    rt: z.string().min(3, "RT harus 3 digit").max(3, "RT harus 3 digit").optional().or(z.literal("")),
    rw: z.string().min(3, "RW harus 3 digit").max(3, "RW harus 3 digit").optional().or(z.literal("")),
    kode_desa: z.number().min(1, "Pilih kode desa yang valid").optional(),
    zipcode: z.string().min(5, "Isi Kode POS minimal 5 digit").optional().or(z.literal("")),
    housings: housingSchema
})


export const familyMemberSchema = z.object({
    full_name: z.string().min(3, "Nama lengkap minimal 3 karakter"),
    nik: z.string().min(16, "NIK harus 16 digit").max(16, "NIK harus 16 digit"),
    address: z.string().min(3, "Isi Alamat minimal 3 karakter").optional().or(z.literal("")),
    stay: z.number().min(1, "Lama tinggal minimal 1 tahun"),
    gender: z.enum([ 'male', 'female' ]).optional().or(z.literal("male")),
    birth_place: z.string().min(3, "Tempat Lahir minimal 3 karakter").optional().or(z.literal("")),
    birth_date: z.string(),
    nationality: z.enum([ 'wna', 'wni' ]).optional().or(z.literal("wni")),
    tribes: z.string().min(3, "Suku minimal 3 karakter").optional().or(z.literal("")),
    religion: z.string().min(3, "Agama minimal 3 karakter").optional().or(z.literal("")),
    used_language: z.string().min(3, "Bahasa minimal 3 karakter").optional().or(z.literal("")),
    family_status: z.string().min(3, "Status Keluarga minimal 3 karakter").optional().or(z.literal("")),
    marital_status: z.string().min(3, "Status Perkawinan minimal 3 karakter").optional().or(z.literal("")),
    works: z.object({
        activity: z.string().min(3, "Aktivitas minimal 3 karakter").optional().or(z.literal("")),
        job: z.string().min(3, "Pekerjaan minimal 3 karakter").optional().or(z.literal("")),
        job_status: z.string().min(3, "Status Pekerjaan minimal 3 karakter").optional().or(z.literal("")),
    }).optional(),
    educations: z.object({
        education: z.string().min(3, "Pendidikan minimal 3 karakter").optional().or(z.literal("")),
    }).optional(),
})