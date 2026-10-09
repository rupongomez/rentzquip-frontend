import ManageRentalTable from "@/components/modules/manage-rental/manage-rental-table";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mt-10">
        Rental Management
      </h1>
      <p className="text-center mt-4">
        Manage your rental bookings and equipment here. You can Pay for your
        bookings, once your booking is confirmed.
      </p>
      <ManageRentalTable />
    </div>
  );
}
