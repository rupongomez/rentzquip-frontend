import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { RentalResponse } from "@/types";

interface ProviderRentalDetailsProps {
  rental: RentalResponse | null;
  onClose: () => void;
}

export default function ProviderRentalDetails({
  rental,
  onClose,
}: ProviderRentalDetailsProps) {
  if (!rental) return null;

  return (
    <Sheet open={!!rental} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Rental details</SheetTitle>
          <SheetDescription>
            Review the customer rental and payment information.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 px-6 pb-6">
          <div className="rounded-2xl bg-emerald-50 p-5">
            <p className="text-sm text-emerald-800">Rental status</p>
            <p className="mt-1 text-2xl font-bold text-emerald-950">
              {rental.rentalStatus}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Detail label="Rental ID" value={rental.id.slice(0, 8)} />
            <Detail label="Quantity" value={String(rental.quantity)} />
            <Detail label="Rental days" value={String(rental.rentalDays)} />
            <Detail label="Rental amount" value={`$${rental.rentalAmount}`} />
            <Detail
              label="Security deposit"
              value={`$${rental.securityDeposit}`}
            />
            <Detail label="Late fee" value={`$${rental.lateFee}`} />
            <Detail label="Damage charge" value={`$${rental.damageCharge}`} />
          </div>

          <div className="space-y-3 rounded-xl border border-slate-200 p-4">
            <Info label="Customer ID" value={rental.customerId} />
            <Info label="Equipment ID" value={rental.equipmentId} />
            <Info label="Start date" value={formatDate(rental.startDate)} />
            <Info label="End date" value={formatDate(rental.endDate)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 break-all font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="break-all text-sm text-slate-800">{value}</span>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
