import {
  changeRentalStatusByProvider,
  createRentalBooking,
  getAllRentalForProvider,
  getUserRentals,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateRentalBooking = () => {
  return useMutation({
    mutationFn: createRentalBooking,
  });
};

export const useGetUserRentals = () => {
  return useQuery({
    queryKey: ["user-rentals"],
    queryFn: () => getUserRentals(),
    retry: false,
  });
};

export const useChangeRentalStatusByProvider = () => {
  return useMutation({
    mutationFn: ({
      rentalId,
      rentalStatus,
    }: {
      rentalId: string;
      rentalStatus: string;
    }) => changeRentalStatusByProvider(rentalId, rentalStatus),
  });
};

export const useGetAllRentalForProvider = () => {
  return useQuery({
    queryKey: ["all-rentals-provider"],
    queryFn: () => getAllRentalForProvider(),
    retry: false,
  });
};
