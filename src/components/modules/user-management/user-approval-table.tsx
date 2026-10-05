import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { useGetAllProviders } from "@/hooks/provider.hook";
import { SearchX } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  handleReview: Dispatch<SetStateAction<string>>;
}

export default function ProviderApprovalTable({
  handleReview,
  ...params
}: Props) {
  const { data: providers } = useGetAllProviders(params);
  const providerList = providers?.data || [];
  // console.log(providers?.data?.meta);

  const isEmpty = providerList.length === 0;
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell>
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <span>
                    <SearchX />{" "}
                  </span>
                  <p>No providers found</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            providerList.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell>
                  <Image
                    src={provider.imageUrl}
                    alt={provider.name}
                    width={20}
                    height={20}
                    unoptimized={true}
                    className="rounded-full h-10 w-10"
                  />
                </TableCell>
                <TableCell>{provider.name}</TableCell>
                <TableCell>{provider.email}</TableCell>
                <TableCell>{provider.address}</TableCell>
                <TableCell>{provider.status}</TableCell>
                <TableCell>{provider.phoneNumber}</TableCell>
                <TableCell>
                  <div>
                    <Button
                      variant="outline"
                      onClick={() => handleReview(provider.id)}
                    >
                      View details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {providers && (
        <TablePagination params={params} metaData={providers.meta} />
      )}
    </div>
  );
}
