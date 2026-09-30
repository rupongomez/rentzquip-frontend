import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 character long")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase character")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase character")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least 1 special character",
    ),
});

export const UserRegistrationSchema = z
  .object({
    name: z
      .string("Not A String!!!!!")
      .min(3, "Name must atleast 3 characters long!!!")
      .max(10),
    email: z.email("Not email!!"),
    role: z.enum(["CUSTOMER", "PROVIDER"], "Please select a role"),
    password: z
      .string()
      .min(8, "Password Must Minimum 8 Characters Long.")
      .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
      .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

      .regex(/[0-9]/, "Password must contain atleast 1 Number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain atleast 1 Special Character",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

//* GP - 017, 013
//* BL - 019, 014
//* Airtel - 016
//* Robi - 018
//* TeleTalk - 01512345678
//! City Cell - 011 (Already dead)
//! there is no 012
//todo we need to confirm from [3-9]

//? Either +880, 880, 0
