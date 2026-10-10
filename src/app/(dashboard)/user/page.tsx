"use client";

import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Package,
  Receipt,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useGetUserRentals } from "@/hooks/rental.hook";
import type { RentalResponse, RentalStatus } from "@/types";

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

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

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
    emerald: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    violet: "bg-violet-50 text-violet-700",
  };

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div className={`rounded-xl p-2.5 ${tones[tone]}`}>{icon}</div>
        <ArrowUpRight className="size-4 text-slate-300" />
      </div>
      <p className="mt-5 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function EmptyMessage({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}

export default function CustomerDashboard() {
  const { data, isPending, isError } = useGetUserRentals();
  const rentals = (data?.data ?? []) as RentalResponse[];

  const totalSpent = rentals.reduce(
    (total, rental) => total + Number(rental.rentalAmount || 0),
    0,
  );
  const totalDeposits = rentals.reduce(
    (total, rental) => total + Number(rental.securityDeposit || 0),
    0,
  );
  const activeRentals = rentals.filter((rental) =>
    ["APPROVED", "PAID", "ONGOING"].includes(rental.rentalStatus),
  ).length;
  const pendingRentals = rentals.filter(
    (rental) => rental.rentalStatus === "PENDING",
  ).length;
  const completedRentals = rentals.filter(
    (rental) => rental.rentalStatus === "COMPLETED",
  ).length;
  const statusCounts = rentalStatuses.map((status) => ({
    status,
    count: rentals.filter((rental) => rental.rentalStatus === status).length,
  }));
  const maxStatusCount = Math.max(...statusCounts.map((item) => item.count), 1);
  const upcomingRentals = [...rentals]
    .filter((rental) =>
      ["PENDING", "APPROVED", "PAID"].includes(rental.rentalStatus),
    )
    .sort(
      (first, second) =>
        new Date(first.startDate).getTime() -
        new Date(second.startDate).getTime(),
    )
    .slice(0, 4);
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
                Rental overview
              </p>
              <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Keep every rental on track.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Review your bookings, upcoming equipment, and rental spending
                from one simple dashboard.
              </p>
            </div>
            <Link
              href="/equipments"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Browse equipment
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </section>

        {isPending ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["spent", "active", "pending", "completed"].map((skeleton) => (
              <div
                key={skeleton}
                className="h-32 animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        ) : isError ? (
          <section className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-semibold text-red-900">
              We couldn&apos;t load your rental overview.
            </p>
            <p className="mt-1 text-sm text-red-700">
              Please refresh the page and try again.
            </p>
          </section>
        ) : (
          <>
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                label="Total spent"
                value={`$${totalSpent.toLocaleString()}`}
                detail={`${rentals.length} total rentals`}
                icon={<CircleDollarSign />}
                tone="emerald"
              />
              <MetricCard
                label="Active rentals"
                value={String(activeRentals)}
                detail="Approved, paid, or ongoing"
                icon={<CalendarDays />}
                tone="blue"
              />
              <MetricCard
                label="Pending requests"
                value={String(pendingRentals)}
                detail="Waiting for provider action"
                icon={<Clock3 />}
                tone="amber"
              />
              <MetricCard
                label="Completed rentals"
                value={String(completedRentals)}
                detail={`${rentals.length ? Math.round((completedRentals / rentals.length) * 100) : 0}% completion rate`}
                icon={<CheckCircle2 />}
                tone="violet"
              />
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Rental status
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      A breakdown of your booking activity
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
                    <EmptyMessage message="Your rental activity will appear here after your first booking." />
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-700 p-5 text-white shadow-lg shadow-emerald-900/10 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-emerald-100">
                      Financial snapshot
                    </p>
                    <h2 className="mt-1 text-2xl font-bold">
                      ${totalDeposits.toLocaleString()}
                    </h2>
                  </div>
                  <ShieldCheck className="size-6 text-emerald-200" />
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/15 pb-3 text-sm">
                    <span className="text-emerald-100">Rental charges</span>
                    <span className="font-semibold">
                      ${totalSpent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/15 pb-3 text-sm">
                    <span className="text-emerald-100">Security deposits</span>
                    <span className="font-semibold">
                      ${totalDeposits.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-emerald-100">Rental days</span>
                    <span className="font-semibold">
                      {rentals.reduce(
                        (total, rental) => total + rental.rentalDays,
                        0,
                      )}{" "}
                      days
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Upcoming rentals
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your next scheduled bookings
                    </p>
                  </div>
                  <Package className="size-5 text-emerald-600" />
                </div>
                <div className="mt-6 space-y-3">
                  {upcomingRentals.length ? (
                    upcomingRentals.map((rental) => (
                      <div
                        key={rental.id}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            Equipment #{rental.equipmentId.slice(0, 8)}
                          </p>
                          <span className="shrink-0 text-xs font-medium text-emerald-700">
                            {rental.rentalStatus}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                          {formatDate(rental.startDate)} -{" "}
                          {formatDate(rental.endDate)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <EmptyMessage message="No upcoming rentals scheduled." />
                  )}
                </div>
              </div>

              <div className="min-w-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Recent activity
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your latest rental records
                    </p>
                  </div>
                  <Receipt className="size-5 text-emerald-600" />
                </div>
                <div className="mt-6 space-y-2">
                  {recentRentals.length ? (
                    recentRentals.map((rental) => (
                      <div
                        key={rental.id}
                        className="flex flex-col gap-2 border-b border-slate-100 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">
                            Equipment #{rental.equipmentId.slice(0, 8)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {formatDate(rental.startDate)} · {rental.rentalDays}{" "}
                            days
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
                          <p className="text-sm font-semibold text-slate-900">
                            ${Number(rental.rentalAmount || 0).toLocaleString()}
                          </p>
                          <p className="text-xs text-slate-500">
                            {rental.rentalStatus}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyMessage message="No rental activity yet." />
                  )}
                </div>
              </div>
            </section>

            {rentals.some((rental) => rental.rentalStatus === "LATE") && (
              <section className="flex items-start gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-orange-900">
                <TriangleAlert className="mt-0.5 size-5 shrink-0 text-orange-600" />
                <div>
                  <p className="font-semibold">Action needed on a rental</p>
                  <p className="mt-1 text-sm text-orange-800">
                    One or more rentals are marked late. Review your rental
                    details to avoid additional fees.
                  </p>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
