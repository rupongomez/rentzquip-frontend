import {
  getMe,
  googleOAuth,
  resendOTP,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}
export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}
export function useResendOTP() {
  return useMutation({
    mutationFn: resendOTP,
  });
}

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}
export function useLogout() {
  const queryClient = useQueryClient();
  queryClient.removeQueries({ queryKey: ["user"] });
  return useMutation({
    mutationFn: userLogout,
  });
}

export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuth,
  });
};

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}
