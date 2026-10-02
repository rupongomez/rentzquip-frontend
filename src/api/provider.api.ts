import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types";
import { ProviderPayload, ProviderResponse } from "@/types/provider.type";

export const becomeProvider = (payload: ProviderPayload) => {
  const formData = new FormData();

  const data = {
    address: payload.address,
    description: payload.description,
    phoneNumber: payload.phoneNumber,
  };
  formData.append("data", JSON.stringify(data));
  formData.append("image", payload.imageUrl);
  return apiClient<ApiResponse<ProviderResponse>>("/provider/apply", {
    method: "POST",
    body: formData,
  });
};

export const getProviderProfile = () => {
  return apiClient("/provider/me");
};
