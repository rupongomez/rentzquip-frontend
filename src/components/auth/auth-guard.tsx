"use client";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoading from "./auth-loading";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data, isPending, isError } = useGetMe();

  const user = data?.data;
  const router = useRouter();

  useEffect(() => {
    if (isPending) return;
    if (isError || !user) router.push("/login");
  }, [isPending, isError, user, router]);

  if (isPending) {
    return <AuthLoading label="Checking authentication..." />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting to login..." />;
  }

  return <>{children}</>;
}
