import { createRentalBooking } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateRentalBooking = () => {
  return useMutation({
    mutationFn: createRentalBooking,
  });
};
