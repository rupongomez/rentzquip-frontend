import { adminRoutes, providerRoutes, userRoutes } from "@/routes";
import { SidebarItem, SidebarItems, UserRole } from "@/types";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import Link from "next/link";
const sidebarRoutes: Partial<Record<UserRole, SidebarItems>> = {
  ADMIN: adminRoutes,
  PROVIDER: providerRoutes,
  CUSTOMER: userRoutes,
};
export default function DashboardSidebar({ role }: { role: UserRole }) {
  const pathName = usePathname();
  const routes: SidebarItems = sidebarRoutes[role] || [];
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <h2>RentzQuip</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((menu) => (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      render={<Link href={menu.url} />}
                      isActive={pathName === menu.url}
                    >
                      {menu.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
