"use client";
import { useQueryClient } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import type { UserRole } from "@/types";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about-us" },
    { name: "Equipments", url: "/equipments" },
  ];

  const dashboardRoutes: Record<UserRole, string> = {
    ADMIN: "/admin",
    MODERATOR: "/moderator",
    PROVIDER: "/provider",
    CUSTOMER: "/user",
  };

  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();

  const role: UserRole = !!data?.data && data?.data.role;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logout Success",
          description: "You have been logged out successfully",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },
      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "An error occurred while trying to log you out",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full border-b">
      <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-3 sm:flex-nowrap sm:px-6 sm:py-0 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1 text-lg font-bold sm:text-xl"
        >
          <Settings className="size-5 animate-spin sm:size-6" /> RentzQuip
        </Link>
        <nav className="order-3 flex w-full items-center justify-center gap-3 overflow-x-auto text-sm sm:order-none sm:w-auto sm:gap-5 sm:text-base">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.url}
              className="shrink-0 whitespace-nowrap"
            >
              {route.name}
            </Link>
          ))}
          {role && (
            <Link
              href={dashboardRoutes[role]}
              className="shrink-0 whitespace-nowrap"
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="shrink-0">
          {!isLoading && !data && (
            <Button
              variant="outline"
              size="sm"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              Login
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
