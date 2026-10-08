import { createEquipment, getAllEquipments, getEquipmentById } from "@/api";
import { EquipmentQueries } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateEquipment = () => {
  return useMutation({
    mutationFn: createEquipment,
  });
};

export const useGetAllEquipments = (params: EquipmentQueries) => {
  return useQuery({
    queryKey: ["equipments-all"],
    queryFn: () => getAllEquipments(params),
    retry: false,
  });
};

export const useGetSingleEquipmentById = (id: string) => {
  return useQuery({
    queryKey: ["equipment-single", id],
    queryFn: () => getEquipmentById(id),
    retry: false,
  });
};
