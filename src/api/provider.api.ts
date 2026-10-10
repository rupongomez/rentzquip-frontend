import apiClient from "@/lib/apiClient";
import { ApiResponse, EquipmentResponse } from "@/types";
import {
  IProviderQuery,
  ProviderPayload,
  ProviderResponse,
} from "@/types/provider.type";

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
  return apiClient<ApiResponse<ProviderResponse>>("/provider/me");
};

// TODO: change type of data and meta to be more specific
export const getAllProviders = (params: IProviderQuery) => {
  return apiClient<ApiResponse<ProviderResponse[]>>("/provider/all", {
    params: params,
  });
};

export const getProviderById = (id: string) => {
  return apiClient<ApiResponse<ProviderResponse>>(`/provider/${id}`);
};

export const updateProviderStatus = (id: string, status: string) => {
  return apiClient<ApiResponse<ProviderResponse>>(`/provider/status/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

export const getProvidersEquipmentByUserId = () => {
  return apiClient<ApiResponse<EquipmentResponse[]>>(
    "/equipment/providers-equipment",
  );
};
