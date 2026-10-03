import {
  becomeProvider,
  getAllProviders,
  getProviderById,
  getProviderProfile,
} from "@/api/provider.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useBecomeProvider = () => {
  return useMutation({
    mutationFn: becomeProvider,
  });
};

export const useGetProviderProfile = () => {
  return useQuery({
    queryFn: getProviderProfile,
    queryKey: ["providerProfile"],
    retry: false,
  });
};

export const useGetAllProviders = () => {
  return useQuery({
    queryFn: getAllProviders,
    queryKey: ["allProviders"],
    retry: false,
  });
};

export const useGetProviderById = (id: string) => {
  return useQuery({
    queryFn: () => getProviderById(id),
    queryKey: ["provider", id],
    retry: false,
  });
};
