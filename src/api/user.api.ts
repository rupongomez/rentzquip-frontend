import apiClient from "@/lib/apiClient";
import { ApiResponse, UserResponse } from "@/types";

export const getAllUsersByAdmin = () => {
  return apiClient<ApiResponse<UserResponse[]>>("/users/all");
};

export const updateUserStatusByAdmin = (userId: string, status: string) => {
  return apiClient(`/users/change-status/${userId}`, {
    method: "PATCH",
    body: { newStatus: status },
  });
};
