"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { useGetUserRentals, useMakePayment } from "@/hooks";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

export default function ManageRentalTable() {
  const { data: rentals } = useGetUserRentals();
  const { mutate: makePayment } = useMakePayment();
  const rentalData = rentals?.data || [];

  const handlePayment = (rentalId: string) => {
    console.log(rentalId);
    makePayment(rentalId, {
      onSuccess: (res) => {
        console.log(res);
        if (res.success) {
          toast.add({
            title: "Redirecting to payment page",
            description: "You will be redirected to the payment page shortly.",
            type: "success",
          });
          window.location.href = res.data;
        }
      },
    });
  };
  return (
    <Table className="w-full mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Equipment</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Rental Amount</TableHead>
          <TableHead>Security Amount</TableHead>
          <TableHead>Total Amount</TableHead>

          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rentalData.map((rental) => (
          <TableRow key={rental.id}>
            <TableCell>
              <Link href={`/equipments/${rental.equipmentId}`}>
                View Equipment
              </Link>
            </TableCell>
            <TableCell>{format(new Date(rental.startDate), "PPP")}</TableCell>
            <TableCell>{format(new Date(rental.endDate), "PPP")}</TableCell>
            <TableCell>{rental.rentalAmount}</TableCell>
            <TableCell>{rental.securityDeposit}</TableCell>
            <TableCell>
              {Number(rental.rentalAmount) + Number(rental.securityDeposit)}
            </TableCell>
            <TableCell>{rental.rentalStatus}</TableCell>
            <TableCell>
              <Button
                onClick={() => handlePayment(rental.id)}
                variant={
                  rental.rentalStatus !== "APPROVED" ? "outline" : "destructive"
                }
                disabled={rental.rentalStatus !== "APPROVED"}
              >
                {rental.rentalStatus === "PENDING"
                  ? "Pay Once Approved"
                  : "Pay Now"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
