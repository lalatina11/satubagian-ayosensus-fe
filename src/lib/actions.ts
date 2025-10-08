"use server";

import z from "zod";
import { ENV } from "./env";
import { loginAdminRegencySchema } from "./schemas";
import { cookies } from "next/headers";
import { UserSession, Village } from "@/types";
import { redirect } from "next/navigation";
import { OfficersFormValues } from "@/components/forms/AddOfficersForm";
import { revalidatePath } from "next/cache";

export const getAccessToken = async () => {
  const cookie = await cookies();
  return cookie.get("access_token")?.value;
};

export const getCurrentSession = async (token: string) => {
  return await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const handleLoginAdminRegency = async (
  values: z.infer<typeof loginAdminRegencySchema>
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

export const getAdminRegencyAuthInfo = async () => {
  const token = await getAccessToken();
  const res = await getCurrentSession(token as string);
  if (!res.ok) {
    return redirect("/login");
  }
  return { session: (await res.json()) as UserSession, token };
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
  const token = await getAccessToken();

  const res = await fetch(`${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/officer`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { tags: ["officers"] },
  });
  return await res.json();
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
      "Terjadi Kesalahan, cobalah untuk mengganti username petugas atau kode desa!"
    );
  }

  const result = await res.json();
  if (result.errors) {
    throw new Error(
      "Terjadi Kesalahan, cobalah untuk mengganti username petugas atau kode desa!"
    );
  }
  revalidatePath("officers");
};

export const getVilages = async (name: string) => {
  const res = await fetch(
    `${ENV.NEXT_PUBLIC_BACKEND_API_BASE_URL}/region/village?name=${name}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      next: { tags: ["villages"] },
    }
  );
  return (await res.json()) as Array<Village>;
};
