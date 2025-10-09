import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/components/dashboard/SuperAdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { getRoleFromSession } from "@/lib";
import { getUserSessionServer } from "@/lib/actions";
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
  const { data: userSession } = await getUserSessionServer();
  console.log(userSession);

  const role = getRoleFromSession(userSession?.session.role);
  return role === "superadmin" ? (
    <SuperAdminDashboard>{children}</SuperAdminDashboard>
  ) : role === "admin" || role === "verifier" ? (
    <AdminDashboard>{children}</AdminDashboard>
  ) : (
    <UserDashboard>{children}</UserDashboard>
  );
};

export default Layout;
