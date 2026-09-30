import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoogleLoginComponent() {
  const { mutate: googleLogin } = useGoogleOAuth();
  const router = useRouter();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Login Successful",
            description: "Welcome Back",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          const apiError = err as Error & {
            data?: {
              message?: string;
            };
          };

          toast.add({
            title: "Google OAuth Failed",
            description:
              apiError.data?.message ||
              "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong. Please try again",
      type: "error",
    });
  };
  return (
    <GoogleLogin
      theme="outline"
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  );
}
