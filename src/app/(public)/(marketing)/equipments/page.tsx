import EquipmentGrid from "@/components/modules/equipments/equipment-grid";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold"> Equipments </h2>
        <p className="text-muted-foreground">Browse all available equipment</p>
      </div>
      <div className="mt-4">
        <EquipmentGrid />
      </div>
    </div>
  );
}
