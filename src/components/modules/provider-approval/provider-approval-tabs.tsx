"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IProviderQuery, ProviderStatus } from "@/types";
import React, { Suspense, useState } from "react";
import ProviderApprovalTable from "./provider-approval-table";
import ProviderTableLoadingSkeleton from "./provider-aproval-table-loading-skeleton";
import ProviderApprovalReviewSheet from "./provider-approval-review-sheet";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";

export default function ProviderApprovalTabs() {
  const [selectedId, setSelectedId] = useState("");
  const [tab, setTab] = useState<"ALL" | ProviderStatus>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  console.log(currentPage);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  const debouncedSearch = useDebounce(searchInput);
  const verificationStatus: ["ALL" | ProviderStatus, string][] = [
    ["ALL", "All"],
    ["ACTIVE", "Active"],
    ["PENDING", "Pending"],
    ["REJECTED", "Rejected"],
    ["BLOCKED", "Blocked"],
  ];

  const queryParams: IProviderQuery = {
    page: currentPage,
    limit,
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };
  return (
    <div className="mb-4 ">
      <div className=" flex flex-row-reverse justify-between my-5 items-center">
        <div>
          <Input
            type="search"
            placeholder="Search by name, email, or phone number"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            {verificationStatus.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Suspense fallback={<ProviderTableLoadingSkeleton />}>
        <ProviderApprovalTable
          {...queryParams}
          handleReview={setSelectedId}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Suspense>

      <ProviderApprovalReviewSheet
        {...queryParams}
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
      />
    </div>
  );
}
