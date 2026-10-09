import apiClient from "@/lib/apiClient";
import { ApiResponse, RentalCreatePayload, RentalResponse } from "@/types";

export const createRentalBooking = (payload: RentalCreatePayload) => {
  return apiClient("/rental/create", {
    method: "POST",
    body: payload,
  });
};

export const getUserRentals = () => {
  return apiClient<ApiResponse<RentalResponse[]>>("/rental/rental-history/all");
};
