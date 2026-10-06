export type Category = {
  id: string;
  name: string;
  description?: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryResponse = {
  categories: Category[];
};
