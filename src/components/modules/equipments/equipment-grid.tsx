import { useGetAllEquipments } from "@/hooks";
import React from "react";

export default function EquipmentGrid() {
  const { data, isPending } = useGetAllEquipments();
  console.log(data);
  return <div>EquipmentGrid</div>;
}
