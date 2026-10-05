"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IProviderQuery, ProviderStatus } from "@/types";
import React, { Suspense, useState } from "react";
import ProviderApprovalTable from "./user-approval-table";
import ProviderTableLoadingSkeleton from "./user-aproval-table-loading-skeleton";
import ProviderApprovalReviewSheet from "./user-review-sheet";

export default function ProviderApprovalTabs() {
  const [selectedId, setSelectedId] = useState("");
  const [tab, setTab] = useState<"ALL" | ProviderStatus>("ALL");
  const [page, setPage] = useState(1);
  const verificationStatus: ["ALL" | ProviderStatus, string][] = [
    ["ALL", "All"],
    ["ACTIVE", "Active"],
    ["PENDING", "Pending"],
    ["REJECTED", "Rejected"],
    ["BLOCKED", "Blocked"],
  ];

  const queryParams: IProviderQuery = {
    page,
    limit: 10,
    ...(tab === "ALL" ? {} : { status: tab }),
  };
  return (
    <div className="mb-4">
      <div>
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
        <ProviderApprovalTable {...queryParams} handleReview={setSelectedId} />
      </Suspense>

      <ProviderApprovalReviewSheet
        {...queryParams}
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
      />
    </div>
  );
}
