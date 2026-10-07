import z from "zod";
import { isAcceptedFileType } from "./provider-application.validation";

export const MAX_IMAGE_FILES = 5;
export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE * 1024 * 1024; // 5MB

export const isAcceptedFileSize = (fileSize: number) => {
  return fileSize <= MAX_FILE_SIZE_IN_BYTES;
};

export const createEquipmentPayloadValidationZodSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
  model: z
    .string()
    .min(3, { message: "Model is required" })
    .max(100, { message: "Model must be less than 100 characters" }),
  brand: z
    .string()
    .min(3, { message: "Brand is required" })
    .max(100, { message: "Brand must be less than 100 characters" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  rentalPrice: z
    .number()
    .min(1, { message: "Rental price must be at least 1" }),
  securityDeposit: z
    .number()
    .min(1, { message: "Security deposit must be at least 1" }),
  categoryId: z.uuid({ message: "Category ID must be a valid UUID" }),
  imageUrl: z
    .array(z.custom<File>((value) => value instanceof File))
    .max(MAX_IMAGE_FILES, {
      message: `You can upload a maximum of ${MAX_IMAGE_FILES} images`,
    })
    .refine(
      (files) =>
        files.every(
          (file) =>
            isAcceptedFileSize(file.size) && isAcceptedFileType(file.type),
        ),
      {
        message: `Each image must be less than ${MAX_FILE_SIZE}MB and of an accepted image file type`,
      },
    ),
});
