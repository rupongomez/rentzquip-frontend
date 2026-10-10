"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EquipmentResponse } from "@/types";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import BookingPeriodSelectionSheet from "./booking-period-selection-sheet";
import { useGetMe } from "@/hooks";
import { toast } from "@/components/ui/toast";

export default function BookNow({
  max,
  equipments,
}: {
  max: number;
  equipments: EquipmentResponse;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedId, setSelectedId] = useState("");
  const { data: getMe } = useGetMe();
  console.log(getMe);
  return (
    <div className="flex  gap-2 mt-5 items-center">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
        >
          <Minus />
        </Button>

        <Input
          type="number"
          min={1}
          max={max}
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.min(max, Math.max(1, Number(e.target.value) || 1)))
          }
          className="w-20 text-center"
        />

        <Button
          type="button"
          onClick={() => setQuantity((q) => Math.min(max, q + 1))}
        >
          <Plus />
        </Button>
      </div>
      <div className="">
        <Button
          variant="default"
          className="p-4"
          onClick={() => {
            if (!getMe) {
              window.location.href = "/login";
              return;
            }
            setSelectedId(equipments.id);
          }}
        >
          Book Now
        </Button>
      </div>
      <BookingPeriodSelectionSheet
        selectedId={selectedId}
        equipments={equipments}
        onClose={() => setSelectedId("")}
        quantity={quantity}
      />
    </div>
  );
}
