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
import { RentalResponse, RentalStatus } from "@/types";
import { useChangeRentalStatusByProvider } from "@/hooks/rental.hook";
import { useQueryClient } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProviderRentalTableProps {
  rentals: RentalResponse[];
  onViewDetails: (rental: RentalResponse) => void;
}

function statusClass(status: RentalResponse["rentalStatus"]) {
  if (status === "APPROVED" || status === "PAID" || status === "ONGOING") {
    return "bg-green-100 text-green-800";
  }
  if (status === "REJECTED" || status === "CANCELLED") {
    return "bg-red-100 text-red-800";
  }
  if (status === "LATE") return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-800";
}

const providerRentalStatuses: RentalStatus[] = [
  "APPROVED",
  "REJECTED",
  "CANCELLED",
  "COMPLETED",
  "ONGOING",
];

export default function ProviderRentalTable({
  rentals,
  onViewDetails,
}: ProviderRentalTableProps) {
  const queryClient = useQueryClient();
  const { mutate: changeRentalStatus, isPending: isChangingStatus } =
    useChangeRentalStatusByProvider();

  const handleStatusChange = (rentalId: string, rentalStatus: RentalStatus) => {
    changeRentalStatus(
      { rentalId, rentalStatus },
      {
        onSuccess: (response) => {
          if (!response.success) {
            toast.add({
              title: "Update failed",
              description:
                response.data.message || "Unable to update the rental status.",
              type: "error",
            });
            return;
          }

          queryClient.invalidateQueries({
            queryKey: ["all-rentals-provider"],
          });
          toast.add({
            title: "Status updated",
            description:
              response.message || "Rental status updated successfully.",
            type: "success",
          });
        },
        onError: () => {
          toast.add({
            title: "Update failed",
            description: "Unable to update the rental status.",
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
            <TableHead>Rental</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Rental amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentals.map((rental) => (
            <TableRow key={rental.id}>
              <TableCell>
                <div>
                  <p className="font-medium text-slate-900">
                    {rental.id.slice(0, 8)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Equipment: {rental.equipmentId.slice(0, 8)}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <p>{formatDate(rental.startDate)}</p>
                  <p className="text-xs text-muted-foreground">
                    to {formatDate(rental.endDate)}
                  </p>
                </div>
              </TableCell>
              <TableCell>{rental.quantity}</TableCell>
              <TableCell>${rental.rentalAmount} </TableCell>
              <TableCell>
                <Select
                  value={rental.rentalStatus}
                  onValueChange={(value) => {
                    if (value && value !== rental.rentalStatus) {
                      handleStatusChange(rental.id, value as RentalStatus);
                    }
                  }}
                  disabled={
                    isChangingStatus ||
                    rental.rentalStatus === "PAID" ||
                    rental.rentalStatus === "LATE"
                  }
                >
                  <SelectTrigger size="sm" className="min-w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {!providerRentalStatuses.includes(rental.rentalStatus) && (
                      <SelectItem value={rental.rentalStatus} disabled>
                        {rental.rentalStatus}
                      </SelectItem>
                    )}
                    {providerRentalStatuses.map((status) => (
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
                  onClick={() => onViewDetails(rental)}
                >
                  <Eye />
                  View details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
