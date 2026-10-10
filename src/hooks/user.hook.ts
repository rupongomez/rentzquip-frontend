import { getAllUsersByAdmin, updateUserStatusByAdmin } from "@/api/user.api";
import { UserStatus } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllUsersByAdmin = () => {
  return useQuery({
    queryKey: ["all-users-admin"],
    queryFn: getAllUsersByAdmin,
    retry: false,
  });
};

export const useUpdateUserStatusByAdmin = () => {
  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: UserStatus }) =>
      updateUserStatusByAdmin(userId, status),
  });
};
