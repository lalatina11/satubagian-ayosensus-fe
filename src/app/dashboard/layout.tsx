import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/components/dashboard/SuperAdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { getRoleFromSession } from "@/lib";
import { getAdminRegencyAuthInfo } from "@/lib/actions";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  const userSession = await getAdminRegencyAuthInfo();

  const role = getRoleFromSession(userSession?.role);
  return role === "superadmin" ? (
    <SuperAdminDashboard>{children}</SuperAdminDashboard>
  ) : role === "admin" ? (
    <AdminDashboard>{children}</AdminDashboard>
  ) : (
    <UserDashboard>{children}</UserDashboard>
  );
};

export default Layout;
