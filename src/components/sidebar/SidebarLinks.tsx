"use client";

import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { UserRole } from "@/types";
import { LayoutDashboard, Users } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  role: UserRole;
}

const SidebarLinks = ({ role }: Props) => {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Petugas",
      url: "/dashboard/officers",
      icon: Users,
    },
  ];

  const pathname = usePathname();

  const filteredItem =
    role === "superadmin"
      ? items
      : items.filter((item) => item.title !== "Petugas");

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Links</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {filteredItem.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                variant={item.url === pathname ? "outline" : "default"}
                asChild
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarLinks;
