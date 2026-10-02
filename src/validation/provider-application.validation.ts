import z from "zod";

export const MAX_FILE_SIZE = 5; // 5MB
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024; // 5MB

const MAX_BIO_LENGTH = 500; // 500 characters

export const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const isAcceptedFileSize = (fileSize: number) => {
  return fileSize <= MAX_FILE_SIZE_BYTES;
};

export const isAcceptedFileType = (fileType: string) => {
  return ACCEPTED_FILE_TYPES.includes(fileType);
};

export const getProviderImageFileSchema = <T>(message: string) =>
  z.custom<T>(
    (value) =>
      value === null ||
      (value instanceof File &&
        isAcceptedFileSize(value.size) &&
        isAcceptedFileType(value.type)),
    {
      message,
    },
  );

export const becomeProviderSchema = z.object({
  address: z.string().min(1, "Address is required"),
  description: z
    .string()
    .max(MAX_BIO_LENGTH, `Bio cannot exceed ${MAX_BIO_LENGTH} characters`),
  imageUrl: getProviderImageFileSchema<File | null>(
    `Image must be a valid file type (jpg, jpeg, png) and not exceed ${MAX_FILE_SIZE} MB`,
  ).refine((value) => value instanceof File, {
    message: "Image is required",
  }),
  phoneNumber: z
    .string()
    .refine((val) => val === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(val), {
      message: "Please provide valid Bangladeshi number",
    }),
});
