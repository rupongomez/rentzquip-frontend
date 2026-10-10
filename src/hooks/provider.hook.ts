import {
  becomeProvider,
  getAllProviders,
  getProviderById,
  getProviderProfile,
  getProvidersEquipmentByUserId,
  updateProviderStatus,
} from "@/api/provider.api";
import { IProviderQuery } from "@/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

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

export const useGetAllProviders = (params: IProviderQuery) => {
  return useQuery({
    queryKey: ["allProviders", params],
    queryFn: () => getAllProviders(params),
    retry: false,
  });
};

export const useSuspenseGetAllProviders = (params: IProviderQuery) => {
  return useSuspenseQuery({
    queryKey: ["allProviders", params],
    queryFn: () => getAllProviders(params),
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

export const useUpdateProviderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateProviderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allProviders"] });
      queryClient.invalidateQueries({ queryKey: ["provider"] });
    },
  });
};

export const useGetProvidersEquipmentByUserId = () => {
  return useQuery({
    queryKey: ["providersEquipment"],
    queryFn: getProvidersEquipmentByUserId,
    retry: false,
  });
};
