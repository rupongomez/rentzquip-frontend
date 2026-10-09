import apiClient from "@/lib/apiClient";
import { RentalCreatePayload } from "@/types";

export const createRentalBooking = (payload: RentalCreatePayload) => {
  return apiClient("/rental/create", {
    method: "POST",
    body: payload,
  });
};
