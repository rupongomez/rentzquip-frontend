"use client";

import { useGetProvidersEquipmentByUserId } from "@/hooks/provider.hook";
import { useGetAllRentalForProvider } from "@/hooks/rental.hook";
import { EquipmentResponse, RentalResponse, RentalStatus } from "@/types";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Package,
  Plus,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const rentalStatuses: RentalStatus[] = [
  "PENDING",
  "APPROVED",
  "PAID",
  "ONGOING",
  "COMPLETED",
  "REJECTED",
  "CANCELLED",
  "LATE",
];

const statusColors: Record<RentalStatus, string> = {
  PENDING: "bg-amber-400",
  APPROVED: "bg-blue-500",
  PAID: "bg-cyan-500",
  ONGOING: "bg-emerald-500",
  COMPLETED: "bg-green-600",
  REJECTED: "bg-rose-500",
  CANCELLED: "bg-slate-400",
  LATE: "bg-orange-500",
};

export default function ProviderDashboard() {
  const { data: equipmentResponse, isPending: equipmentPending } =
    useGetProvidersEquipmentByUserId();
  const { data: rentalResponse, isPending: rentalsPending } =
    useGetAllRentalForProvider();

  const equipment = (equipmentResponse?.data ?? []) as EquipmentResponse[];
  const rentals = (rentalResponse?.data ?? []) as RentalResponse[];
  const isLoading = equipmentPending || rentalsPending;

  const totalRevenue = rentals.reduce(
    (total, rental) => total + Number(rental.rentalAmount || 0),
    0,
  );
  const activeRentals = rentals.filter((rental) =>
    ["APPROVED", "PAID", "ONGOING"].includes(rental.rentalStatus),
  ).length;
  const pendingRentals = rentals.filter(
    (rental) => rental.rentalStatus === "PENDING",
  ).length;
  const availableEquipment = equipment.filter(
    (item) => item.status === "AVAILABLE",
  ).length;
  const statusCounts = rentalStatuses.map((status) => ({
    status,
    count: rentals.filter((rental) => rental.rentalStatus === status).length,
  }));
  const maxStatusCount = Math.max(...statusCounts.map((item) => item.count), 1);
  const recentRentals = [...rentals]
    .sort(
      (first, second) =>
        new Date(second.startDate).getTime() -
        new Date(first.startDate).getTime(),
    )
    .slice(0, 5);

  return (
    <main className="min-h-full bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/10 sm:p-8">
          <div className="absolute -right-20 -top-32 size-96 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 size-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-300">
                <BarChart3 className="size-4" />
                Provider overview
              </p>
              <h1 className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
                Keep your rental business moving.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                Track your equipment, monitor active rentals, and stay on top of
                every customer request from one place.
              </p>
            </div>
            <Link
              href="/provider/add-equipment"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              <Plus className="size-4" />
              Add equipment
            </Link>
          </div>
        </section>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["revenue", "active-rentals", "pending-rentals", "available-equipment"].map(
              (skeleton) => (
              <div
                key={skeleton}
                className="h-32 animate-pulse rounded-2xl bg-muted"
              />
              ),
            )}
          </div>
        ) : (
          <>
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                label="Total revenue"
                value={`$${totalRevenue.toLocaleString()}`}
                detail={`${rentals.length} total rentals`}
                icon={<CircleDollarSign />}
                tone="emerald"
              />
              <MetricCard
                label="Active rentals"
                value={String(activeRentals)}
                detail="Currently in progress"
                icon={<CalendarDays />}
                tone="blue"
              />
              <MetricCard
                label="Pending requests"
                value={String(pendingRentals)}
                detail="Needs your attention"
                icon={<Clock3 />}
                tone="amber"
              />
              <MetricCard
                label="Available equipment"
                value={String(availableEquipment)}
                detail={`${equipment.length} total listings`}
                icon={<Package />}
                tone="violet"
              />
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Rental activity
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Distribution of your rental requests
                    </p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-700">
                    <BarChart3 className="size-5" />
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  {statusCounts
                    .filter((item) => item.count > 0)
                    .map(({ status, count }) => (
                      <div key={status}>
                        <div className="mb-1.5 flex justify-between text-xs">
                          <span className="font-medium text-slate-600">
                            {status}
                          </span>
                          <span className="font-semibold text-slate-900">
                            {count}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${statusColors[status]}`}
                            style={{
                              width: `${(count / maxStatusCount) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  {!rentals.length && (
                    <EmptyMessage message="Rental activity will appear here once customers start booking." />
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-700 p-6 text-white shadow-lg shadow-emerald-900/10">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-emerald-100">Business pulse</p>
                    <h2 className="mt-1 text-2xl font-bold">
                      {equipment.length
                        ? `${Math.round((availableEquipment / equipment.length) * 100)}%`
                        : "0%"}{" "}
                      available
                    </h2>
                  </div>
                  <CheckCircle2 className="size-7 text-emerald-200" />
                </div>
                <div className="mt-8 h-3 overflow-hidden rounded-full bg-emerald-950/30">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{
                      width: `${
                        equipment.length
                          ? (availableEquipment / equipment.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-emerald-100">
                  Keep your listings available and up to date to help more
                  customers find what they need.
                </p>
                <Link
                  href="/provider/manage-equipment"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-emerald-100"
                >
                  Manage equipment <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </section>

            <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Recent rentals
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    The latest activity on your listings
                  </p>
                </div>
                <Link
                  href="/provider/manage-rental"
                  className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  View all
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {recentRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
                        <Package className="size-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          Equipment #{rental.equipmentId.slice(0, 8)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(rental.startDate)} · {rental.rentalDays}{" "}
                          days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <span className="font-semibold text-slate-900">
                        ${rental.rentalAmount}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {rental.rentalStatus}
                      </span>
                    </div>
                  </div>
                ))}
                {!recentRentals.length && (
                  <EmptyMessage message="No rentals to show yet." />
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  tone: "emerald" | "blue" | "amber" | "violet";
}) {
  const tones = {
    emerald: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    violet: "bg-violet-100 text-violet-700",
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={`rounded-xl p-2.5 ${tones[tone]}`}>{icon}</div>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}

function EmptyMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 py-5 text-sm text-muted-foreground">
      <TriangleAlert className="size-4" />
      {message}
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
