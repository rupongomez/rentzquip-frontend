import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EquipmentResponse } from "@/types";
import { format } from "date-fns";

interface ManageEquipmentDetailsProps {
  equipment: EquipmentResponse | null;
  onClose: () => void;
}

export default function ManageEquipmentDetails({
  equipment,
  onClose,
}: ManageEquipmentDetailsProps) {
  if (!equipment) return null;

  const image = equipment.imageUrl?.[0]?.url;

  return (
    <Sheet open={!!equipment} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Equipment details</SheetTitle>
          <SheetDescription>
            Review the information for your listed equipment.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 px-6 pb-6">
          <div className="overflow-hidden rounded-2xl bg-slate-100">
            {image ? (
              <img
                src={image}
                alt={equipment.name}
                className="h-52 w-full object-cover"
              />
            ) : (
              <div className="flex h-52 items-center justify-center text-sm text-muted-foreground">
                No image available
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {equipment.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {equipment.brand} · {equipment.model}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Detail label="Quantity" value={String(equipment.quantity)} />
            <Detail
              label="Status"
              value={equipment.status}
              valueClassName="text-emerald-700"
            />
            <Detail
              label="Rental price"
              value={`$${equipment.rentalPrice}/day`}
            />
            <Detail
              label="Security deposit"
              value={`$${equipment.securityDeposit}`}
            />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Description
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {equipment.description || "No description provided."}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Added{" "}
            {equipment.createdAt
              ? format(new Date(equipment.createdAt), "PPP")
              : "N/A"}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Detail({
  label,
  value,
  valueClassName = "",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`mt-1 font-semibold text-slate-900 ${valueClassName}`}>
        {value}
      </p>
    </div>
  );
}
