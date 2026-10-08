"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAllEquipments } from "@/hooks";
import { EquipmentQueries } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function EquipmentGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const queryParams: EquipmentQueries = {
    page: currentPage,
    limit,

    // ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };
  const { data, isPending } = useGetAllEquipments(queryParams);

  const equipments = data?.data || [];
  console.log(equipments);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-11/12 mx-auto justify-center">
        {equipments.map((equipments) => (
          <Card key={equipments?.id} className="w-full h-full mx-auto ">
            <CardHeader>
              <CardTitle className="flex justify-center items-center">
                {equipments?.imageUrl ? (
                  equipments.imageUrl
                    ?.map((image) => (
                      <Image
                        key={image.publicId}
                        src={image?.url || "/equipment-placeholder.png"}
                        width={200}
                        height={200}
                        alt={equipments?.name}
                        unoptimized
                        className="object-contain h-50 w-full"
                      />
                    ))
                    .at(0)
                ) : (
                  <Image
                    src="/equipment-placeholder.png"
                    width={200}
                    height={200}
                    alt={equipments?.name}
                    unoptimized
                  />
                )}
              </CardTitle>
              <div className="flex flex-col justify-center items-center my-2">
                <CardTitle className="flex justify-center items-center">
                  {equipments?.name}
                </CardTitle>
                <CardDescription>
                  Rental Price: ${equipments?.rentalPrice}/{" "}
                  <span className="text-xs text-muted-foreground">day</span>
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Button variant="outline">
                <Link href={`/equipments/${equipments?.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
