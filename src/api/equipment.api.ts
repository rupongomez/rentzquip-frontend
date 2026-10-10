import apiClient from "@/lib/apiClient";
import {
  ApiResponse,
  CreateEquipmentPayload,
  EquipmentQueries,
  EquipmentResponse,
  IEquipmentStatus,
} from "@/types";

export const createEquipment = (payload: CreateEquipmentPayload) => {
  const formData = new FormData();
  const data = {
    name: payload.name,
    description: payload.description,
    model: payload.model,
    brand: payload.brand,
    quantity: payload.quantity,
    rentalPrice: payload.rentalPrice,
    securityDeposit: payload.securityDeposit,
    categoryId: payload.categoryId,
  };
  formData.append("data", JSON.stringify(data));
  for (const file of payload.imageUrl) {
    formData.append("images", file);
  }

  return apiClient("/equipment/create", {
    method: "POST",
    body: formData,
  });
};

export const getAllEquipments = (params: EquipmentQueries) => {
  return apiClient<ApiResponse<EquipmentResponse[]>>("/equipment/all", {
    params,
  });
};

export const getEquipmentById = (id: string) => {
  return apiClient<ApiResponse<EquipmentResponse>>(`/equipment/single/${id}`);
};

export const updateEquipmentStatusByProvider = (
  equipmentId: string,
  status: IEquipmentStatus,
) => {
  return apiClient<ApiResponse<EquipmentResponse>>(
    `/equipment/change-status/${equipmentId}`,
    {
      method: "PATCH",
      body: { newStatus: status },
    },
  );
};
