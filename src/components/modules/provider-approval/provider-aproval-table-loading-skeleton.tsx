import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";

export default function ProviderTableLoadingSkeleton() {
  return (
    <div>
      <TableBody>
        {[1, 2, 3].map((item) => (
          <TableRow key={item}>
            <TableCell>
              <Skeleton className="h-6 w-24" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </div>
  );
}
