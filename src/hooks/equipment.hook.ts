import { createEquipment } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateEquipment = () => {
  return useMutation({
    mutationFn: createEquipment,
  });
};
