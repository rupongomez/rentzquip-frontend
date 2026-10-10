"use client";

import { useGetAllCategories } from "@/hooks/category.hook";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  BriefcaseBusiness,
  Camera,
  Car,
  Dumbbell,
  Gamepad2,
  Home,
  Lightbulb,
  MoreHorizontal,
  Package,
  SearchX,
  Tent,
  Wrench,
} from "lucide-react";
import Link from "next/link";

const categoryIcons = [
  BriefcaseBusiness,
  Home,
  Wrench,
  Camera,
  Dumbbell,
  Tent,
  Gamepad2,
  Car,
  Lightbulb,
  Package,
];

function getCategoryIcon(name: string) {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("home")) return Home;
  if (normalizedName.includes("tool") || normalizedName.includes("construct")) {
    return Wrench;
  }
  if (normalizedName.includes("camera") || normalizedName.includes("photo")) {
    return Camera;
  }
  if (
    normalizedName.includes("sport") ||
    normalizedName.includes("fitness") ||
    normalizedName.includes("gym")
  ) {
    return Dumbbell;
  }
  if (
    normalizedName.includes("event") ||
    normalizedName.includes("camp") ||
    normalizedName.includes("outdoor")
  ) {
    return Tent;
  }
  if (
    normalizedName.includes("game") ||
    normalizedName.includes("gaming") ||
    normalizedName.includes("entertainment")
  ) {
    return Gamepad2;
  }
  if (
    normalizedName.includes("vehicle") ||
    normalizedName.includes("car") ||
    normalizedName.includes("transport")
  ) {
    return Car;
  }

  return null;
}

export default function EquipmentCategories() {
  const { data, isPending, isError } = useGetAllCategories();
  const categories = data?.data.categories ?? [];

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-16 sm:py-20">
      <div className="absolute -right-32 top-12 size-80 rounded-full bg-emerald-100/70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Explore the marketplace
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Find equipment for every kind of plan
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Browse popular categories and discover the equipment you need
              without buying something you only need temporarily.
            </p>
          </div>

          <Button
            variant="outline"
            render={<Link href="/equipments" />}
            nativeButton={false}
            className="w-fit gap-2 border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50"
          >
            Browse all equipment
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {isPending && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["one", "two", "three", "four"].map((item) => (
              <Card key={item} className="border-0 shadow-sm">
                <CardContent className="space-y-4 p-5">
                  <Skeleton className="size-12 rounded-2xl" />
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {isError && (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <p className="font-semibold text-red-900">
              Categories are temporarily unavailable.
            </p>
            <p className="mt-1 text-sm text-red-700">
              Please try again in a moment.
            </p>
          </div>
        )}

        {!isPending && !isError && categories.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <SearchX className="mx-auto size-9 text-slate-400" />
            <p className="mt-3 font-semibold text-slate-900">
              No categories available yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back soon for new equipment categories.
            </p>
          </div>
        )}

        {!isPending && !isError && categories.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => {
              const Icon =
                getCategoryIcon(category.name) ||
                categoryIcons[index % categoryIcons.length] ||
                MoreHorizontal;

              return (
                <Card
                  key={category.id}
                  className="group border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-700 group-hover:text-white">
                        <Icon className="size-6" />
                      </div>
                      <span className="text-xs font-medium text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-semibold text-slate-950">
                      {category.name}
                    </h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                      {category.description ||
                        `Explore ${category.name.toLowerCase()} available for rent.`}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t border-slate-100 px-5 py-4">
                    <Link
                      href={`/equipments?categoryId=${category.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-900"
                    >
                      Explore category
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
