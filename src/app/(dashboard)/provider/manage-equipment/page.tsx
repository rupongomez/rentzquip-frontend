import { ManageEquipmentTabs } from "@/components/modules/manage-equipment";
import React from "react";

export default function page() {
  return (
    <section className="w-full h-full  text-center items-center">
      <h2 className="text-2xl font-bold">Manage Your Equipment</h2>
      <p className="text-sm text-muted-foreground">
        Here you can manage your equipment.
      </p>
      <ManageEquipmentTabs />
    </section>
  );
}
