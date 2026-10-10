"use client";
import { adminRoutes, providerRoutes, userRoutes } from "@/routes";
import { SidebarItem, SidebarItems, UserRole } from "@/types";
import { usePathname } from "next/navigation";
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
import { Settings } from "lucide-react";
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
        <Link href="/" className="text-xl font-bold flex gap-1 items-center">
          <Settings className="animate-spin" /> RentzQuip
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
