"use client";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { FileText, FileUp, X } from "lucide-react";
import { formateFileSize } from "@/utils/file-size.utils";
import {
  becomeProviderSchema,
  MAX_FILE_SIZE,
} from "@/validation/provider-application.validation";
import {
  useBecomeProvider,
  useGetProviderProfile,
} from "@/hooks/provider.hook";
import { toast } from "../ui/toast";
import { ProviderPayload } from "@/types/provider.type";
import { Spinner } from "../ui/spinner";

export function BecomeProviderForm() {
  const { mutate: apply, isPending } = useBecomeProvider();
  const { data, isPending: isGetProviderProfilePending } =
    useGetProviderProfile();

  const form = useForm({
    defaultValues: {
      address: "",
      description: "",
      imageUrl: null as File | null,
      phoneNumber: "",
    },
    validators: {
      onSubmit: becomeProviderSchema,
    },
    onSubmit: ({ value }) => {
      const applicationData: ProviderPayload = {
        address: value.address,
        description: value.description,
        imageUrl: value.imageUrl!,
        phoneNumber: value.phoneNumber,
      };

      apply(applicationData, {
        onSuccess: (res) => {
          if (res.success) {
            form.reset();
            toast.add({
              title: "Application Submitted",
              description:
                res?.message ||
                "Your application has been submitted successfully.",
              type: "success",
            });
          }
        },
        onError: (err) => {
          const apiError = err as Error & { data?: { message?: string } };
          toast.add({
            title: "Application Failed",
            description:
              apiError?.data?.message ||
              "There was an error submitting your application.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-5 w-8/12 mx-auto mt-5">
      <div className="flex flex-col gap-2 items-center text-center">
        <h1 className="text-2xl font-bold tracking-tight">Become a Provider</h1>
        <p className="text-balance text-sm text-muted-foreground ">
          {data?.data ? (
            data.data.status === "PENDING" ? (
              <div>
                <p className="text-yellow-500">
                  {" "}
                  Your application is pending approval. Please wait for further
                  updates.
                </p>
              </div>
            ) : (
              "You are already a provider."
            )
          ) : (
            "Fill out the form below to become a provider."
          )}
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(e);
        }}
      >
        <FieldGroup>
          <form.Field name="address">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="false"
                    placeholder="state, city, street, house number"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="false"
                    placeholder="Write a short description about yourself or equipment you have to offer"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="phoneNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="false"
                    placeholder="+1 123 456 7890"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="imageUrl">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const file = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="image-field">Image</FieldLabel>
                  <div>
                    <Button
                      render={<label htmlFor="image-field" />}
                      nativeButton={false}
                      variant="outline"
                    >
                      <FileUp size="4" />
                      Upload your image
                    </Button>

                    <input
                      type="file"
                      id="image-field"
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm ">
                        <FileText className="size-4 shrink-0 text-primary" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formateFileSize(file.size)}
                        </span>
                        <button
                          onClick={() => field.handleChange(null)}
                          type="button"
                        >
                          <X />
                        </button>
                      </span>
                    ) : (
                      <span>
                        supported File: .png, .jpg, .jpeg, and size{" "}
                        {MAX_FILE_SIZE}
                        MB
                      </span>
                    )}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {
            <Button
              type="submit"
              disabled={isPending || isGetProviderProfilePending}
            >
              {isPending ? (
                <>
                  <Spinner />
                  Submitting...{" "}
                </>
              ) : (
                "Apply"
              )}
            </Button>
          }
        </FieldGroup>
      </form>
    </div>
  );
}
