import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/components/dashboard/SuperAdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { getRoleFromSession } from "@/lib";
import { getAdminRegencyAuthInfo } from "@/lib/actions";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Ayo Sensus | Admin",
  description: "Ayo sensus by Satu Bagian team",
  icons: "/ayosensus.svg",
};

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  const { data: userSession } = await getAdminRegencyAuthInfo();

  const role = getRoleFromSession(userSession?.session.role);
  return role === "superadmin" ? (
    <SuperAdminDashboard>{children}</SuperAdminDashboard>
  ) : role === "admin" ? (
    <AdminDashboard>{children}</AdminDashboard>
  ) : (
    <UserDashboard>{children}</UserDashboard>
  );
};

export default Layout;
