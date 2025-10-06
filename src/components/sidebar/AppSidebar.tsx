import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar";
import { UserRole } from "@/types";
import { ModeToggle } from "../ModeToggle";
import LogoutForm from "../forms/LogoutForm";
import SidebarLinks from "./SidebarLinks";

interface Props {
  role: UserRole;
}

export async function AppSidebar({ role }: Props) {

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row gap-2 items-center justify-between">
        <span className="font-semibold underline">
          {role === "superadmin"
            ? "Super Admin Dashboard"
            : role === "admin"
            ? "Admin Dashboard"
            : "User Dashboard"}
        </span>
        <ModeToggle />
      </SidebarHeader>
      <SidebarContent>
       <SidebarLinks role={role}/>
      </SidebarContent>
      <SidebarFooter className="flex w-full">
        <div className="flex w-full justify-end">
          <LogoutForm />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
