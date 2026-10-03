export type ProviderStatus = "PENDING" | "ACTIVE" | "REJECTED" | "BLOCKED";

export type ProviderResponse = {
  provider: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    description: string;
    imageUrl: string;
    imagePublicId: string | null;
    status: ProviderStatus;
    userId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
};

export type ProviderPayload = {
  address: string;
  description: string;
  imageUrl: File;
  phoneNumber: string;
};

export interface IProviderQuery {
  limit?: number;
  page?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  searchTerm?: string;
}
