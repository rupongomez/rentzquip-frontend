import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
} from "./pagination";
import { IProviderQuery, Meta } from "@/types";

interface TablePaginationProps {
  metaData: Meta;
  params: IProviderQuery;
}

export default function TablePagination({
  params,
  metaData,
}: TablePaginationProps) {
  console.log(params, metaData);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
