"use client";
import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  if (success === "true") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  p-4 w-7/12 mx-auto">
        <h2 className="text-2xl font-bold flex gap-1 items-center">
          {" "}
          <ShieldCheck className="text-green-700 size-7" /> Payment Successful
        </h2>
        <p className="text-lg text-wrap text-center mt-4">
          Your transaction has been completed successfully. Collect your
          equipment from the designated location at booked time.
        </p>
        <Link className="mt-4 text-blue-500 hover:underline" href="/equipments">
          <Button variant="link">Make Another Booking</Button>
        </Link>
      </div>
    );
  } else if (success === "false") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen  p-4 w-7/12 mx-auto">
        <h2 className="text-2xl font-bold flex gap-1 items-center">
          <ShieldAlert className="text-red-400 size-7" />
          Payment Failed
        </h2>
        <p className="text-lg text-wrap text-center mt-4">
          Your transaction could not be completed. Please try again or contact
          support for assistance.
        </p>
        <Link
          className="mt-4 text-blue-500 hover:underline"
          href="/user/manage-rental"
        >
          <Button variant="link">Try Again</Button>
        </Link>
      </div>
    );
  }
}
