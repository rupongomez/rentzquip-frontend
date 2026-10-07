"use client";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useGetAllCategories } from "@/hooks/category.hook";
import { Spinner } from "../ui/spinner";
import { FileText, FileUp, X } from "lucide-react";
import { formateFileSize } from "@/utils/file-size.utils";
import { MAX_FILE_SIZE } from "@/validation";
import {
  createEquipmentPayloadValidationZodSchema,
  MAX_IMAGE_FILES,
} from "@/validation/equipment.validation";

export default function AddEquipmentForm() {
  const { data, isPending: categoryPending } = useGetAllCategories();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      model: "",
      brand: "",
      quantity: 0,
      rentalPrice: 0,
      securityDeposit: 0,
      categoryId: "",
      imageUrl: [] as File[],
    },
    validators: {
      onSubmit: createEquipmentPayloadValidationZodSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });
  const categories = data?.data.categories || [];

  const isCategoryLoading = categoryPending;

  if (isCategoryLoading) {
    return (
      <div className="flex gap-2">
        <Spinner className="animate-spin" />
        Loading categories...
      </div>
    );
  }
  return (
    <div className="w-full justify-center mx-auto max-w-md p-4 bg-white rounded-lg shadow-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="categoryId">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => {
                      if (value !== null) {
                        field.handleChange(value);
                      }
                    }}
                  >
                    <SelectTrigger
                      id={field.name}
                      onBlur={field.handleBlur}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="model">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Model</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="brand">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Brand</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="quantity">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Quantity</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="rentalPrice">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Rental Price</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="securityDeposit">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Security Deposit</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    value={field.state.value}
                    onBlur={field.handleBlur}
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
              const files = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor="imageUrl">Image</FieldLabel>
                  <div>
                    <Button
                      render={<label htmlFor="imageUrl" />}
                      nativeButton={false}
                      variant="outline"
                    >
                      <FileUp size="4" />
                      Upload your image
                    </Button>

                    <input
                      id="imageUrl"
                      type="file"
                      multiple
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const incoming = Array.from(e.target.files ?? []);
                        field.handleChange([...files, ...incoming]);

                        if (incoming.length === 0) {
                          return;
                        }

                        field.handleChange([...files, ...incoming]);
                        e.target.value = "";
                      }}
                    />
                    {files.length > 0 && (
                      <span>
                        {files.length} of {MAX_IMAGE_FILES} files Added. Size{" "}
                        {(
                          files.reduce((acc, file) => acc + file.size, 0) /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB
                      </span>
                    )}
                    {files.length > 0 && (
                      <ul>
                        {files.map((file, index) => (
                          <li key={`${file.name}-${index}`}>
                            <span className="flex gap-2 items-center">
                              <FileText className="size-4 shrink-0 text-primary" />
                              <span className="truncate">{file.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {formateFileSize(file.size)}
                              </span>
                              <button
                                type="button"
                                aria-label={`Remove ${file.name}`}
                                onClick={() => {
                                  field.handleChange(
                                    files.filter((_, i) => i !== index),
                                  );
                                  field.handleBlur();
                                }}
                                className="text-muted-foreground transition-colors hover:text-destructive"
                              >
                                <X />
                              </button>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button type="submit" variant="default">
            Create
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
