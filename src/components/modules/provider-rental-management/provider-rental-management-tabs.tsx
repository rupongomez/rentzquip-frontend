"use client";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllRentalForProvider } from "@/hooks/rental.hook";
import { RentalResponse, RentalStatus } from "@/types";
import { ClipboardList } from "lucide-react";
import { useMemo, useState } from "react";
import ProviderRentalTable from "./provider-rental-table";
import ProviderRentalDetails from "./provider-rental-details";

type RentalFilter = "ALL" | RentalStatus;

export default function ProviderRentalManagementTabs() {
  const { data, isPending, isError } = useGetAllRentalForProvider();

  const [filter, setFilter] = useState<RentalFilter>("ALL");
  const [search, setSearch] = useState("");
  const [selectedRental, setSelectedRental] = useState<RentalResponse | null>(
    null,
  );

  const rentals = useMemo(() => {
    const list = (data?.data ?? []) as RentalResponse[];
    const normalizedSearch = search.trim().toLowerCase();

    return list.filter((rental) => {
      const matchesStatus = filter === "ALL" || rental.rentalStatus === filter;
      const matchesSearch =
        !normalizedSearch ||
        rental.id.toLowerCase().includes(normalizedSearch) ||
        rental.equipmentId.toLowerCase().includes(normalizedSearch) ||
        rental.customerId.toLowerCase().includes(normalizedSearch);

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
          We couldn&apos;t load your rentals.
        </p>
        <p className="mt-1 text-sm text-red-700">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:flex-row lg:items-center lg:justify-between">
        <Tabs
          value={filter}
          onValueChange={(value) => setFilter(value as RentalFilter)}
        >
          <TabsList className="flex-wrap">
            <TabsTrigger value="ALL">All</TabsTrigger>
            <TabsTrigger value="PENDING">Pending</TabsTrigger>
            <TabsTrigger value="APPROVED">Approved</TabsTrigger>
            <TabsTrigger value="PAID">Paid</TabsTrigger>
            <TabsTrigger value="ONGOING">Ongoing</TabsTrigger>
            <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
            <TabsTrigger value="REJECTED">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search rental, customer, or equipment ID"
          className="w-full lg:max-w-xs"
        />
      </div>

      {rentals.length ? (
        <ProviderRentalTable
          rentals={rentals}
          onViewDetails={setSelectedRental}
        />
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <ClipboardList className="mx-auto size-10 text-slate-400" />
          <h2 className="mt-4 font-semibold text-slate-900">
            No rentals found
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another search or status filter.
          </p>
        </div>
      )}

      <ProviderRentalDetails
        rental={selectedRental}
        onClose={() => setSelectedRental(null)}
      />
    </section>
  );
}
