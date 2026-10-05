import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { IProviderQuery, Meta } from "@/types";

interface TablePaginationProps {
  metaData: Meta;
  params: IProviderQuery;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

export default function TablePagination({
  params,
  metaData,
  setCurrentPage,
  currentPage,
}: TablePaginationProps) {
  const ITEMS_PER_PAGE = metaData.limit || 10;
  // const [currentPage, setPage] = useState(params.page || 1);

  console.log(params, metaData);
  const totalPages = Math.ceil(metaData.total / ITEMS_PER_PAGE);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }}
            className={`${currentPage === 1 ? "pointer-events-none opacity-50 disabled:" : ""}`}
          />
        </PaginationItem>
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }}
            className={`${currentPage === totalPages ? "pointer-events-none opacity-50 disabled:" : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
