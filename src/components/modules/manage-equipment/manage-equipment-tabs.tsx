"use client";

import { PackageSearch } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetProvidersEquipmentByUserId } from "@/hooks/provider.hook";
import type { EquipmentResponse, IEquipmentStatus } from "@/types";
import ManageEquipmentDetails from "./manage-equipment-details";
import ManageEquipmentTable from "./manage-equipment-table";

type EquipmentFilter = "ALL" | IEquipmentStatus;

export default function ManageEquipmentTabs() {
  const { data, isPending, isError } = useGetProvidersEquipmentByUserId();
  const [filter, setFilter] = useState<EquipmentFilter>("ALL");
  const [search, setSearch] = useState("");
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentResponse | null>(null);
  const equipment = useMemo(() => {
    const list = (data?.data ?? []) as EquipmentResponse[];
    const normalizedSearch = search.trim().toLowerCase();

    return list.filter((item) => {
      const matchesStatus = filter === "ALL" || item.status === filter;
      const matchesSearch =
        !normalizedSearch ||
        [item.name, item.brand, item.model].some((value) =>
          value.toLowerCase().includes(normalizedSearch),
        );

      return matchesStatus && matchesSearch;
    });
  }, [data?.data, filter, search]);

  if (isPending) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-full animate-pulse rounded-xl bg-muted" />
        <div className="h-80 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="font-semibold text-red-900">
          We couldn&apos;t load your equipment.
        </p>
        <p className="mt-1 text-sm text-red-700">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  return (
    <section className="min-w-0 space-y-5">
      <div className="flex min-w-0 flex-col gap-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <Tabs
          value={filter}
          onValueChange={(value) => setFilter(value as EquipmentFilter)}
          className="min-w-0"
        >
          <TabsList className="flex w-full flex-nowrap justify-start gap-1 overflow-x-auto p-1 sm:flex-wrap sm:overflow-visible">
            <TabsTrigger className="shrink-0" value="ALL">
              All
            </TabsTrigger>
            <TabsTrigger className="shrink-0" value="AVAILABLE">
              Available
            </TabsTrigger>
            <TabsTrigger className="shrink-0" value="PENDING">
              Pending
            </TabsTrigger>
            <TabsTrigger className="shrink-0" value="RENTED">
              Rented
            </TabsTrigger>
            <TabsTrigger className="shrink-0" value="MAINTENANCE">
              Maintenance
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, brand, or model"
          className="h-10 w-full lg:max-w-xs"
        />
      </div>

      {equipment.length ? (
        <div className="max-sm:[&_td:nth-child(2)]:hidden max-sm:[&_td:nth-child(3)]:hidden max-sm:[&_th:nth-child(2)]:hidden max-sm:[&_th:nth-child(3)]:hidden">
          <ManageEquipmentTable
            equipment={equipment}
            onViewDetails={setSelectedEquipment}
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <PackageSearch className="mx-auto size-10 text-slate-400" />
          <h2 className="mt-4 font-semibold text-slate-900">
            No equipment found
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another search or status filter.
          </p>
        </div>
      )}

      <ManageEquipmentDetails
        equipment={selectedEquipment}
        onClose={() => setSelectedEquipment(null)}
      />
    </section>
  );
}
