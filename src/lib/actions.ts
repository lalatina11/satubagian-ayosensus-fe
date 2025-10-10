"use server";

import z from "zod";
import { ENV } from "./env";
import {
    checkNikCitizenSchema,
    familyDataSchema,
    familyMemberSchema,
    loginAdminRegencySchema,
    loginCitizenSchema,
    verifyOtpSchema
} from "./schemas";
import { cookies } from "next/headers";
import { FamilyData, FamilyMemberType, Officer, UserSession, Village } from "@/types";
import { redirect } from "next/navigation";
import { OfficersFormValues } from "@/components/forms/AddOfficersForm";
import { revalidatePath } from "next/cache";
import { actionResponse } from ".";

export const getAccessToken = async () => {
    const cookie = await cookies();
    return cookie.get("access_token")?.value;
};

export const getCurrentSession = async (token: string) => {
    try {
        const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/me`, {
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });
        return actionResponse({ error: false, data: res, message: "OK" });
    } catch (error) {
        return actionResponse({
            error: false,
            data: null,
            message: (error as Error).message,
        });
    }
};

export const handleLoginAdminRegency = async (
    values: z.infer<typeof loginAdminRegencySchema>,
) => {
    const cookie = await cookies();
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
    });
    const result = await res.json();
    if (result.error) {
        throw new Error(result.error || "Something went wrong!");
    }
    cookie.set("access_token", result.access_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 2,
        httpOnly: true,
        sameSite: "lax",
        secure: ENV.NODE_ENV === "production",
    });
};

export const getUserSessionServer = async () => {
    try {
        const token = await getAccessToken();

        const { data: res } = await getCurrentSession(token as string);
        if (!res) throw new Error("Terjadi Kesalahan!");
        if (!res?.ok) {
            return redirect("/login");
        }
        const data = { session: (await res.json()) as UserSession, token };
        return actionResponse({ error: false, data, message: "OK" });
    } catch (error) {
        return actionResponse({
            error: false,
            data: null,
            message: (error as Error).message,
        });
    }
};
export const handleLogOutAdminRegency = async () => {
    const cookie = await cookies();
    const token = await getAccessToken();
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (result.error) {
        throw new Error(result.error || "Something went wrong!");
    }
    cookie.delete("access_token");
};

export const getOfficersData = async () => {
    try {
        const token = await getAccessToken();

        const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/officer`, {
            headers: { Authorization: `Bearer ${token}` },
            next: { tags: [ "officers" ] },
        });
        const result = await res.json();
        const data = result.data as Array<Officer>;
        return actionResponse({ error: false, data, message: "OK" });
    } catch (error) {
        return actionResponse({
            error: true,
            data: null,
            message:
                (error as Error).message ||
                "Terjadi Kesalahan, Coba Lagi beberapa saat!",
        });
    }
};

export const handleAddOfficers = async (values: OfficersFormValues) => {
    const token = await getAccessToken();
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/officer`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ data: values.officers }),
    });

    if (!res.ok) {
        throw new Error(
            "Terjadi Kesalahan, cobalah untuk mengganti username petugas atau kode desa!",
        );
    }

    const result = await res.json();
    if (result.errors) {
        throw new Error(
            "Terjadi Kesalahan, cobalah untuk mengganti username petugas atau kode desa!",
        );
    }
    revalidatePath("officers");
};

export const getVilages = async (name: string) => {
    try {
        const res = await fetch(
            `${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/region/village?name=${name}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                next: { tags: [ "villages" ] },
            },
        );

        return actionResponse({
            error: false,
            data: (await res.json()) as Array<Village>,
            message: "OK",
        });
    } catch (error) {
        return actionResponse({
            error: false,
            data: null,
            message:
                (error as Error).message ||
                "Terjadi Kesalahan, Coba Lagi beberapa Saat",
        });
    }
};

export const checkNIK = async (field: z.infer<typeof checkNikCitizenSchema>) => {
    const cookie = await cookies()
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/check-nik`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(field)
    })
    const result = await res.json();
    if (!result.success) {
        throw new Error(result.message || "Terjadi Kesalahan, Coba Lagi beberapa Saat");
    }
    cookie.set("nik", field.nik, {
        path: "/",
        maxAge: 60 * 60 * 24 * 2,
        httpOnly: true,
        sameSite: "lax",
        secure: ENV.NODE_ENV === "production",
    })
}

export const handleVerifyOtp = async (values: z.infer<typeof verifyOtpSchema>) => {
    const cookie = await cookies()
    const nik = await cookie.get("nik")?.value
    if (!nik) {
        throw new Error("Invalid Action!")
    }
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/validasi-otp`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...values, name: nik })
    })
    const result = await res.json()
    if (result.success && result.success === "false") {
        throw new Error(result.message || "Terjadi Kesalahan, Coba Lagi beberapa Saat")
    }
    cookie.delete("nik")
    cookie.set("access_token", result.access_token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 2,
        httpOnly: true,
        sameSite: "lax",
        secure: ENV.NODE_ENV === "production",
    });
}

export const handleLoginCitizens = async (values: z.infer<typeof loginCitizenSchema>) => {
    const cookie = await cookies()
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/login-user`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...values, name: values.nik })
    })
    const result = await res.json();
    if (!result.success) {
        throw new Error(result.message || "Terjadi Kesalahan, Coba Lagi beberapa Saat");
    }
    cookie.set("nik", values.nik, {
        path: "/",
        maxAge: 60 * 60 * 24 * 2,
        httpOnly: true,
        sameSite: "lax",
        secure: ENV.NODE_ENV === "production",
    })
}

export const handleAddFamilyData = async (values: z.infer<typeof familyDataSchema>) => {
    const token = await getAccessToken()
    if (!token) throw new Error("You are not authenticated!")
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/kirim-keluarga`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
    })
    console.log(await res.json())
    revalidatePath("familyData")
}

export const getFamilyData = async () => {
    try {

        const token = await getAccessToken()
        if (!token) throw new Error("You are not authenticated!")
        const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/keluarga`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }, next: { tags: [ 'familyData' ] }
        })
        const result = await res.json()
        const family = result.data as FamilyData
        return actionResponse({ error: false, data: family, message: "OK" })
    } catch (e) {
        return actionResponse({ error: true, data: null, message: (e as Error).message })
    }
}

export const getFamilyMembersData = async () => {
    try {
        const token = await getAccessToken()
        if (!token) throw new Error("You are not authenticated!")
        const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/anggota-keluarga`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`
            },
            next: { tags: [ 'familyMembersData' ] }
        })
        const result = await res.json()
        const data = result.data as Array<FamilyMemberType>
        return actionResponse({ error: false, data, message: "OK" })
    } catch (e) {
        return actionResponse({ error: true, data: null, message: (e as Error).message })
    }
}

export const handleAddFamilyMembersData = async (values: z.infer<typeof familyMemberSchema>) => {
    const { data: userSession } = await getUserSessionServer()
    if (!userSession) throw new Error("You are not authenticated!")
    const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/kirim-anggota-keluarga`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${userSession.token}`
        },
        body: JSON.stringify({ ...values, household_id: userSession.session.household_id })
    })
    console.log(await res.json())
    revalidatePath("familyMembersData")
}
