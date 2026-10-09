import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";

export default function BookingPeriodSelectionSheet({
  selectedId,
  onClose,
}: {
  selectedId: string;
  onClose: () => void;
}) {
  return (
    <Sheet open={!!selectedId} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Booking Period Selection</SheetTitle>
          <SheetDescription>
            Please select the booking period for the equipment.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
