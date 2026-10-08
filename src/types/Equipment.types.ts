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
