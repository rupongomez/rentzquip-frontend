"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

export default function BookingQuantityCount({ max }: { max: number }) {
  const [quantity, setQuantity] = useState(1);
  return (
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
  );
}
