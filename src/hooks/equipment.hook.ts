import { createEquipment, getAllEquipments } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateEquipment = () => {
  return useMutation({
    mutationFn: createEquipment,
  });
};

export const useGetAllEquipments = () => {
  return useQuery({
    queryKey: ["equipments-all"],
    queryFn: getAllEquipments,
    retry: false,
  });
};
