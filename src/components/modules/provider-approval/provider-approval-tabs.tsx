"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProviderStatus } from "@/types";
import React, { Suspense, useState } from "react";
import ProviderApprovalTable from "./provider-approval-table";
import ProviderTableLoadingSkeleton from "./provider-aproval-table-loading-skeleton";
import ProviderApprovalReviewSheet from "./provider-approval-review-sheet";

export default function ProviderApprovalTabs() {
  const [selectedId, setSelectedId] = useState("");
  const [tab, setTab] = useState<"ALL" | ProviderStatus>("ALL");
  const verificationStatus: ["ALL" | ProviderStatus, string][] = [
    ["ALL", "All"],
    ["ACTIVE", "Active"],
    ["PENDING", "Pending"],
    ["REJECTED", "Rejected"],
    ["BLOCKED", "Blocked"],
  ];
  return (
    <div className="mb-4">
      <div>
        <Tabs>
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
        <ProviderApprovalTable handleReview={setSelectedId} />
      </Suspense>

      <ProviderApprovalReviewSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
      />
    </div>
  );
}
