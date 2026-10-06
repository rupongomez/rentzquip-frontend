import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types";
import { CategoryResponse } from "@/types/Equipment.types";

export const getAllCategories = () => {
  return apiClient<ApiResponse<CategoryResponse>>("/category");
};
