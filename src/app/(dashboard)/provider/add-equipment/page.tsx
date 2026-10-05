import AddEquipmentForm from "@/components/form/add-equipment-form";
import React from "react";

export default function page() {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Equipments</h1>
        <p className="text-muted-foreground">Browse all available equipment</p>
      </div>
      <AddEquipmentForm />
    </div>
  );
}
