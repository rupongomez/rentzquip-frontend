import MakeBookingForm from "@/components/form/make-booking-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EquipmentResponse } from "@/types";
import React from "react";

type BookingPeriodSelectionSheetProps = {
  selectedId: string;
  onClose: () => void;
  equipments: EquipmentResponse;
  quantity: number;
};

export default function BookingPeriodSelectionSheet({
  selectedId,
  onClose,
  equipments,
  quantity,
}: BookingPeriodSelectionSheetProps) {
  return (
    <Sheet open={!!selectedId} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Booking Period Selection</SheetTitle>
          <SheetDescription>
            Please select the booking period for the equipment.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4 px-4">
          <h1>
            Set booking period for{" "}
            <span className="font-bold">{equipments.model}</span>
          </h1>
          <p>
            Price: ${equipments.rentalPrice}/
            <span className="font-bold">day</span>
          </p>
          <p>Security Deposit ${equipments.securityDeposit}</p>
          <MakeBookingForm
            equipments={equipments}
            quantity={quantity}
            onClose={onClose}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
