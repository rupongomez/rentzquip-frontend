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
