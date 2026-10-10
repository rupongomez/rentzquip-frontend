import { ProviderResponse } from "./provider.type";

export type CreateEquipmentPayload = {
  name: string;
  description: string;
  model: string;
  brand: string;
  quantity: number;
  rentalPrice: number;
  securityDeposit: number;
  categoryId: string;
  imageUrl: File[];
};

export type EquipmentQueries = {
  limit?: number;
  page?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
};

export type IEquipmentStatus =
  | "AVAILABLE"
  | "RENTED"
  | "MAINTENANCE"
  | "PENDING";

export type EquipmentImageUrls = {
  url: string;
  publicId: string;
};

export type EquipmentResponse = {
  id: string;
  name: string;
  description?: string;
  model: string;
  brand: string;
  quantity: number;
  rentalPrice: number;
  securityDeposit: number;
  imageUrl?: EquipmentImageUrls[] | null;
  categoryId: string;
  providerId: string;
  status: IEquipmentStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  provider?: ProviderResponse;
};
