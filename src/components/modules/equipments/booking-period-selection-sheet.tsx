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
};

export default function BookingPeriodSelectionSheet({
  selectedId,
  onClose,
  equipments,
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
          <p>Selected Equipment ID: {selectedId}</p>
        </div>
        <MakeBookingForm />
      </SheetContent>
    </Sheet>
  );
}
