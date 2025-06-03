import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, "Must be at least 3 characters long"),
    firstLastName: z.string().min(3, "Must be at least 3 characters long"),
    secondLastName: z.string().min(3, "Must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Must be at least 6 characters long"),
    phoneNumber: z
      .string()
      .min(11, "Must be at least 8 digits")
      .regex(/^[0-9]+$/, "Only numbers are allowed"),
    role: z.string().optional(),
    id: z.number().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });