import { Suspense } from "react";

import EquipmentGrid from "@/components/modules/equipments/equipment-grid";
import { Skeleton } from "@/components/ui/skeleton";

function EquipmentGridFallback() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8 xl:grid-cols-4">
      {["one", "two", "three", "four"].map((item) => (
        <div key={item} className="space-y-4 rounded-2xl border p-4">
          <Skeleton className="aspect-[4/3] w-full rounded-xl" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <div>
      <div className="text-center my-5">
        <h2 className="text-2xl font-bold"> Equipments </h2>
        <p className="text-muted-foreground">Browse all available equipment</p>
      </div>
      <div className="mt-4">
        <Suspense fallback={<EquipmentGridFallback />}>
          <EquipmentGrid />
        </Suspense>
      </div>
    </div>
  );
}
