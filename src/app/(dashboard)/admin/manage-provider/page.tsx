import ProviderApprovalTabs from "@/components/modules/provider-approval/provider-approval-tabs";
import React from "react";

export default function page() {
  return (
    <section className="container mx-auto p-4 ">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold">Manage Providers</h1>
        <p className="text-muted-foreground">
          Approve or reject provider applications.
        </p>
      </div>
      <ProviderApprovalTabs />
    </section>
  );
}
