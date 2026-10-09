import { createRentalBooking, getUserRentals } from "@/api";
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
