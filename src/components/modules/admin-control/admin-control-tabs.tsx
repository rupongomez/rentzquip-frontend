"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllUsersByAdmin } from "@/hooks/user.hook";
import { UserResponse, UserRole, UserStatus } from "@/types";
import { useMemo, useState } from "react";
import AdminControlTable from "./admin-control-table";
import AdminControlTableLoadingSkeleton from "./admin-control-table-loading-skeleton";
import AdminControlReviewSheet from "./admin-control-review-sheet";

type UserFilter = "ALL" | UserStatus;

export default function AdminControlTabs() {
  const { data, isPending, isError } = useGetAllUsersByAdmin();
  const [filter, setFilter] = useState<UserFilter>("ALL");
  const [roleFilter, setRoleFilter] = useState<"ALL" | UserRole>("ALL");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const users = useMemo(() => {
    const list = (data?.data ?? []) as UserResponse[];
    const normalizedSearch = search.trim().toLowerCase();

    return list.filter((user) => {
      const matchesStatus = filter === "ALL" || user.status === filter;
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesSearch =
        !normalizedSearch ||
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch) ||
        user.contactNumber?.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesRole && matchesSearch;
    });
  }, [data?.data, filter, roleFilter, search]);

  if (isPending) {
    return <AdminControlTableLoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="font-semibold text-red-900">
          We couldn&apos;t load the users.
        </p>
        <p className="mt-1 text-sm text-red-700">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <Tabs
            value={filter}
            onValueChange={(value) => setFilter(value as UserFilter)}
          >
            <TabsList className="flex-wrap">
              <TabsTrigger value="ALL">All users</TabsTrigger>
              <TabsTrigger value="ACTIVE">Active</TabsTrigger>
              <TabsTrigger value="BLOCKED">Blocked</TabsTrigger>
            </TabsList>
          </Tabs>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, or phone"
            className="w-full xl:max-w-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(["ALL", "CUSTOMER", "PROVIDER", "MODERATOR", "ADMIN"] as const).map(
            (role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  roleFilter === role
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {role === "ALL" ? "Every role" : role}
              </button>
            ),
          )}
        </div>
      </div>

      <AdminControlTable users={users} onViewDetails={setSelectedId} />

      <AdminControlReviewSheet
        selectedId={selectedId}
        users={users}
        onClose={() => setSelectedId("")}
      />
    </div>
  );
}
