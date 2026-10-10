"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TablePagination from "@/components/ui/table-pagination";
import { useDebounce, useGetAllEquipments } from "@/hooks";
import { EquipmentQueries } from "@/types";
import { SearchX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function EquipmentGrid() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") || undefined;

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const handleSortByChange = (value: string | null) => {
    if (!value) return;
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (value: string | null) => {
    if (!value) return;
    setSortOrder(value as "asc" | "desc");
    setCurrentPage(1);
  };

  const debouncedSearch = useDebounce(searchInput);

  const queryParams: EquipmentQueries = {
    page: currentPage,
    limit,
    sortBy,
    sortOrder,
    categoryId,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };
  const { data, isPending } = useGetAllEquipments(queryParams);
  const equipments = data?.data || [];
  console.log(equipments);
  const hasSearchQuery = searchInput.trim().length > 0;

  return (
    <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <Input
          type="search"
          placeholder="Search equipments..."
          value={searchInput}
          onChange={handleSearch}
          className="h-10 w-full sm:max-w-sm"
        />
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <Select value={sortBy} onValueChange={handleSortByChange}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">Newest</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="rentalPrice">Rental price</SelectItem>
              <SelectItem value="quantity">Quantity</SelectItem>
              <SelectItem value="updatedAt">Recently updated</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={handleSortOrderChange}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {["one", "two", "three", "four"].map((item) => (
            <div key={item} className="space-y-4 rounded-2xl border p-4">
              <Skeleton className="aspect-[4/3] w-full rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
        </div>
      ) : equipments.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <SearchX className="size-7" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            {hasSearchQuery ? "No equipment found" : "No equipment available"}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {hasSearchQuery
              ? `We couldn't find any equipment matching "${searchInput.trim()}". Try a different search term.`
              : "There is no equipment available for this selection right now."}
          </p>
          {hasSearchQuery && (
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => {
                setSearchInput("");
                setCurrentPage(1);
              }}
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {equipments.map((equipment) => (
            <Card key={equipment.id} className="flex h-full w-full flex-col">
              <CardHeader className="flex-1 p-4 sm:p-6">
                <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50">
                  {equipment.imageUrl?.[0]?.url ? (
                    <Image
                      src={equipment.imageUrl[0].url}
                      width={400}
                      height={300}
                      alt={equipment.name}
                      unoptimized
                      className="size-full object-contain p-3"
                    />
                  ) : (
                    <Image
                      src="/equipment-placeholder.png"
                      width={400}
                      height={300}
                      alt={equipment.name}
                      unoptimized
                      className="size-full object-contain p-3"
                    />
                  )}
                </div>
                <div className="mt-4 min-w-0">
                  <CardTitle className="truncate text-base sm:text-lg">
                    {equipment.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Rental Price: ${equipment.rentalPrice}/{" "}
                    <span className="text-xs text-muted-foreground">day</span>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="p-4 pt-0 sm:p-6 sm:pt-0">
                <Button
                  variant="outline"
                  className="w-full"
                  render={<Link href={`/equipments/${equipment.id}`} />}
                  nativeButton={false}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {data?.meta && data.meta.totalPages > 1 && (
        <div className="mt-6 overflow-x-auto pb-2">
          <TablePagination
            params={queryParams}
            metaData={data.meta}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
}
