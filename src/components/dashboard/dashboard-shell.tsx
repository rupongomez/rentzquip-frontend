import { UserRole } from "@/types";
import React, { ReactNode } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardShell({
  children,
  roles,
}: {
  children: ReactNode;
  roles: UserRole;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={roles} />
      <SidebarInset>
        <header>
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
