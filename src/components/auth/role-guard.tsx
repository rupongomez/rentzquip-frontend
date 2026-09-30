import { useGetMe } from "@/hooks";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";
import AccessDenied from "./access-denied";
interface IProps {
  children: ReactNode;
  role: UserRole[];
}
export default function RoleGuard({ children, role }: IProps) {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();

  const user = data?.data;

  const isAuthorized = !!user && role.includes(user.role);

  useEffect(() => {
    if (isPending) return;
    if (isError || !user) {
      router.push("/login");
    }
  }, [user, isError, isPending, router]);

  if (isError || !user) {
    return <AuthLoading label="Redirecting to login..." />;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
}
