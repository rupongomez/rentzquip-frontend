"use client";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { loginSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useGoogleOAuth, useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { GoogleLogin } from "@react-oauth/google";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: login, isPending: loginPending } = useLogin();
  const demoAccounts = [
    {
      label: "Login as Customer",
      email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL,
      password: process.env.NEXT_PUBLIC_TEST_USER_PASSWORD,
    },
    {
      label: "Login as Provider",
      email: process.env.NEXT_PUBLIC_TEST_PROVIDER_EMAIL,
      password: process.env.NEXT_PUBLIC_TEST_PROVIDER_PASSWORD,
    },
    {
      label: "Login as Admin",
      email: process.env.NEXT_PUBLIC_TEST_ADMIN_EMAIL,
      password: process.env.NEXT_PUBLIC_TEST_ADMIN_PASSWORD,
    },
  ];
  const handleLogin = (email: string, password: string) => {
    login(
      { email, password },
      {
        onSuccess: (res) => {
          console.log(res.data);
          toast.add({
            title: "Login Successful",
            description: "Welcome back! You have successfully logged in.",
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
            title: "Login Failed",
            description:
              apiError.data?.message ||
              "Please check your credentials and try again.",
            type: "error",
          });
        },
      },
    );
  };
  const form = useForm({
    defaultValues: {
      email: "rupongomez@gmail.com",
      password: "Password@123",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };
      login(loginData, {
        onSuccess: (res) => {
          console.log(res.data);
          toast.add({
            title: "Login Successful",
            description: "Welcome back! You have successfully logged in.",
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
            title: "Login Failed",
            description:
              apiError.data?.message ||
              "Please check your credentials and try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Login to your account
        </h1>
        <p className="text-balance text-sm text-muted-foreground ">
          Welcome back! Please enter your credentials to login.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="false"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      type={showPassword ? "text" : "password"}
                      autoComplete="false"
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <Button disabled={loginPending} type="submit">
            {loginPending ? (
              <>
                <Spinner />
                "Logging in..."{" "}
              </>
            ) : (
              "Login"
            )}
          </Button>
          {demoAccounts.map((account) => (
            <Button
              key={account.label}
              type="button"
              variant="outline"
              disabled={loginPending || !account.email || !account.password}
              onClick={() => {
                if (!account.email || !account.password) return;

                handleLogin(account.email, account.password);
              }}
            >
              {account.label}
            </Button>
          ))}
        </FieldGroup>
      </form>
      <FieldSeparator>or</FieldSeparator>
      <GoogleLoginComponent />
    </div>
  );
}
