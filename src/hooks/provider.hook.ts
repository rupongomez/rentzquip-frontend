import { becomeProvider } from "@/api/provider.api";
import { useMutation } from "@tanstack/react-query";

export const useBecomeProvider = () => {
  return useMutation({
    mutationFn: becomeProvider,
  });
};
