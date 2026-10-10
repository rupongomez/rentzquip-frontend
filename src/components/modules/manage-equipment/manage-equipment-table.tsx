import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EquipmentResponse } from "@/types";
import { IEquipmentStatus } from "@/types";
import { useUpdateEquipmentStatusByProvider } from "@/hooks/equipment.hook";
import { useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ManageEquipmentTableProps {
  equipment: EquipmentResponse[];
  onViewDetails: (equipment: EquipmentResponse) => void;
}

const equipmentStatuses: EquipmentResponse["status"][] = [
  "AVAILABLE",
  "RENTED",
  "MAINTENANCE",
  "PENDING",
];

export default function ManageEquipmentTable({
  equipment,
  onViewDetails,
}: ManageEquipmentTableProps) {
  const queryClient = useQueryClient();
  const { mutate: changeStatus, isPending: isChangingStatus } =
    useUpdateEquipmentStatusByProvider();

  const handleStatusChange = (
    equipmentId: string,
    status: IEquipmentStatus,
  ) => {
    changeStatus(
      { equipmentId, status },
      {
        onSuccess: (response) => {
          if (!response.success) {
            toast.add({
              title: "Update failed",
              description:
                response.message || "Unable to update the equipment status.",
              type: "error",
            });
            return;
          }

          queryClient.invalidateQueries({ queryKey: ["providersEquipment"] });
          toast.add({
            title: "Status updated",
            description:
              response.message || "Equipment status updated successfully.",
            type: "success",
          });
        },
        onError: () => {
          toast.add({
            title: "Update failed",
            description: "Unable to update the equipment status.",
            type: "error",
          });
        },
      },
    );
  };

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
                  <Select
                    value={item.status}
                    onValueChange={(value) => {
                      if (value && value !== item.status) {
                        handleStatusChange(
                          item.id,
                          value as IEquipmentStatus,
                        );
                      }
                    }}
                    disabled={isChangingStatus}
                  >
                    <SelectTrigger size="sm" className="min-w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
