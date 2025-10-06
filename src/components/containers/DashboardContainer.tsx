import { UserRole } from "@/types";
import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../sidebar/AppSidebar";

interface Props {
  role: UserRole;
  children: ReactNode;
}
const DashboardContainer = ({ children, role }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <main className="p-2 min-h-screen bg-background flex w-full flex-col">
        <div className="flex gap-2 items-center">
          <SidebarTrigger />
          <span className="font-semibold">
            {role === "superadmin"
              ? "Super Admin Dashboard"
              : role === "admin"
              ? "Admin Dashboard"
              : "User Dashboard"}
          </span>
        </div>
        <div className="p-1">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardContainer;
