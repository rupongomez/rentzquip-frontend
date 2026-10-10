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

export const changeRentalStatusByProvider = (
  rentalId: string,
  rentalStatus: string,
) => {
  return apiClient(`/rental/update-status/${rentalId}`, {
    method: "PATCH",
    body: {
      rentalStatus,
    },
  });
};

export const getAllRentalForProvider = () => {
  return apiClient<ApiResponse<RentalResponse[]>>(
    "/rental/provider-rentals/all",
  );
};
export const getAllRentalForAdmin = () => {
  return apiClient<ApiResponse<RentalResponse[]>>("/rental/admin-rentals/all");
};
