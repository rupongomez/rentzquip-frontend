import apiClient from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

export const makePayment = (rentalId: string) => {
  return apiClient("/payments/create-checkout-session", {
    method: "POST",
    body: { rentalId: rentalId },
  });
};
