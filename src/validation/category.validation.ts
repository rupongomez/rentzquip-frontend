import z from "zod";
/*
{
  "name": "Makita Cordless Drill",
  "description": "18V cordless drill suitable for home and professional projects.",
  "model": "DHP482",
  "brand": "Makita",
  "quantity": 3,
  "rentalPrice": 500,
  "securityDeposit": 3000,
  "categoryId": "c4894d30-7e88-49a8-bbfc-acef2a436337"
}
*/
export const categoryPayloadValidationZodSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  description: z.string().optional(),
  model: z
    .string()
    .min(3, { message: "Model is required" })
    .max(50, { message: "Model must be less than 50 characters" }),
  brand: z
    .string()
    .min(3, { message: "Brand is required" })
    .max(50, { message: "Brand must be less than 50 characters" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  rentalPrice: z
    .number()
    .min(1, { message: "Rental price must be at least 1" }),
  securityDeposit: z
    .number()
    .min(1, { message: "Security deposit must be at least 1" }),
  categoryId: z.uuid({ message: "Category ID must be a valid UUID" }),
});
