import { makePayment } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useMakePayment = () => {
  return useMutation({
    mutationFn: makePayment,
  });
};
