import { becomeProvider, getProviderProfile } from "@/api/provider.api";
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
