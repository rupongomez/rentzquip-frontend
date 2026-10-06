import { getAllCategories } from "@/api/category.api";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["allCategories"],
    queryFn: () => getAllCategories(),
    retry: false,
  });
};
