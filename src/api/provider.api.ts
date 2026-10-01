import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types";
import { ProviderPayload, ProviderResponse } from "@/types/provider.type";

export const becomeProvider = (payload: ProviderPayload) => {
  return apiClient<ApiResponse<ProviderResponse>>("/provider/apply", {
    method: "POST",
    body: payload,
  });
};
