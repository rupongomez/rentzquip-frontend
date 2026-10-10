"use client";

import { ArrowRight, PackageSearch, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllEquipments } from "@/hooks";

export default function FeaturedEquipment() {
  const { data, isPending, isError } = useGetAllEquipments({
    page: 1,
    limit: 8,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const equipment = data?.data ?? [];

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="absolute -left-32 top-24 size-80 rounded-full bg-emerald-100/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              <Star className="size-4 fill-current" />
              Featured equipment
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Quality gear, ready when you need it
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore recently listed equipment from trusted providers and
              choose the right gear for your next project or adventure.
            </p>
          </div>

          <Button
            variant="outline"
            render={<Link href="/equipments" />}
            nativeButton={false}
            className="w-fit gap-2 border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50"
          >
            View all equipment
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {isPending && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["one", "two", "three", "four"].map((item) => (
              <Card key={item} className="border-slate-200 shadow-sm">
                <CardContent className="space-y-4 p-4">
                  <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <p className="font-semibold text-red-900">
              Featured equipment is temporarily unavailable.
            </p>
            <p className="mt-1 text-sm text-red-700">
              Please try again in a moment.
            </p>
          </div>
        )}

        {!isPending && !isError && equipment.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
            <PackageSearch className="mx-auto size-9 text-slate-400" />
            <p className="mt-3 font-semibold text-slate-900">
              No featured equipment available yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              New equipment will appear here as providers add their listings.
            </p>
          </div>
        )}

        {!isPending && !isError && equipment.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((item) => (
              <Card
                key={item.id}
                className="group flex h-full flex-col border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                <CardHeader className="p-4">
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                    <Image
                      src={
                        item.imageUrl?.[0]?.url || "/equipment-placeholder.png"
                      }
                      width={400}
                      height={300}
                      alt={item.name}
                      unoptimized
                      className="size-full object-contain p-3 transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                      {item.status === "AVAILABLE" ? "Available" : item.status}
                    </span>
                  </div>
                  <div className="mt-4 min-w-0">
                    <CardTitle className="truncate text-base text-slate-950">
                      {item.name}
                    </CardTitle>
                    <CardDescription className="mt-1 truncate">
                      {item.brand} · {item.model}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 px-4 pb-4">
                  <p className="text-lg font-bold text-emerald-700">
                    ${item.rentalPrice}
                    <span className="ml-1 text-xs font-medium text-slate-500">
                      / day
                    </span>
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="outline"
                    className="w-full border-slate-200 group-hover:border-emerald-200 group-hover:bg-emerald-50"
                    render={<Link href={`/equipments/${item.id}`} />}
                    nativeButton={false}
                  >
                    View details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
