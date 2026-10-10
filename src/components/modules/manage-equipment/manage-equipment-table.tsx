import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EquipmentResponse } from "@/types";
import { Eye } from "lucide-react";

interface ManageEquipmentTableProps {
  equipment: EquipmentResponse[];
  onViewDetails: (equipment: EquipmentResponse) => void;
}

function statusClass(status: EquipmentResponse["status"]) {
  if (status === "AVAILABLE") return "bg-green-100 text-green-800";
  if (status === "RENTED") return "bg-blue-100 text-blue-800";
  if (status === "MAINTENANCE") return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-800";
}

export default function ManageEquipmentTable({
  equipment,
  onViewDetails,
}: ManageEquipmentTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Equipment</TableHead>
            <TableHead>Brand / Model</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Rental price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipment.map((item) => {
            const image = item.imageUrl?.[0]?.url;

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="size-12 overflow-hidden rounded-xl bg-slate-100">
                      {image ? (
                        <img
                          src={image}
                          alt={item.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-xs text-slate-400">
                          No image
                        </div>
                      )}
                    </div>
                    <span className="max-w-40 truncate font-medium text-slate-900">
                      {item.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-slate-800">{item.brand}</p>
                    <p className="max-w-48 truncate text-xs text-muted-foreground">
                      {item.model}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.rentalPrice}/day</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(item.status)}`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(item)}
                  >
                    <Eye />
                    View details
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
