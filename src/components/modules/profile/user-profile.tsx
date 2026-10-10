"use client";

import { useGetMe } from "@/hooks";
import {
  BadgeCheck,
  CalendarDays,
  Mail,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Link from "next/link";

export default function UserProfile() {
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;

  if (isPending) {
    return (
      <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <div className="h-52 animate-pulse rounded-3xl bg-muted" />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="h-48 animate-pulse rounded-2xl bg-muted" />
          <div className="h-48 animate-pulse rounded-2xl bg-muted" />
        </div>
      </section>
    );
  }

  if (isError || !user) {
    return (
      <section className="mx-auto w-full max-w-5xl px-4 py-16 text-center sm:px-6">
        <p className="text-lg font-semibold text-slate-900">
          We couldn&apos;t load your profile.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Please refresh the page and try again.
        </p>
      </section>
    );
  }

  const displayName = user.name || "Equipment renter";
  const profileImage =
    user.profileImage ||
    user.imageUrl ||
    user.avatar ||
    user.photoUrl ||
    user.picture ||
    user.image;
  const initials = displayName
    .split(" ")
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const role = user.role?.toLowerCase() || "customer";
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "Member";

  return (
    <main className="min-h-full bg-slate-50/70">
      <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        <div className="relative overflow-hidden rounded-3xl bg-emerald-800 px-6 py-8 text-white shadow-xl shadow-emerald-900/10 sm:px-10 sm:py-10">
          <div className="absolute -right-16 -top-24 size-72 rounded-full bg-emerald-500/30 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 size-64 rounded-full bg-teal-400/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="size-20 shrink-0 overflow-hidden rounded-full bg-white text-2xl font-bold text-emerald-800 ring-4 ring-emerald-300/30">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={`${displayName}'s profile`}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    {initials}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-200">
                  Your profile
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  {displayName}
                </h1>
                <p className="mt-1 flex items-center gap-2 text-sm text-emerald-100">
                  <BadgeCheck className="size-4" />
                  {role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 text-sm text-emerald-50">
              <ShieldCheck className="size-4" />
              Account active
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <UserRound className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">
                  Account details
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your basic account information
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
                <Mail className="mt-0.5 size-5 text-emerald-700" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Email address
                  </p>
                  <p className="mt-1 break-all font-medium text-slate-900">
                    {user.email || "Not available"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 text-emerald-700" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Account type
                  </p>
                  <p className="mt-1 font-medium capitalize text-slate-900">
                    {role}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <CalendarDays className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Membership</h2>
                <p className="text-sm text-muted-foreground">
                  Your{" "}
                  <Link
                    href="/"
                    className="text-xl font-bold flex gap-1 items-center"
                  >
                    <Settings className="animate-spin" /> RentzQuip
                  </Link>{" "}
                  activity
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-emerald-50 p-5">
              <p className="text-sm text-emerald-800">Member since</p>
              <p className="mt-1 text-2xl font-bold text-emerald-950">
                {memberSince}
              </p>
              <p className="mt-3 text-sm leading-6 text-emerald-800/80">
                Browse equipment, manage your rentals, and keep your account
                information up to date from your dashboard.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
