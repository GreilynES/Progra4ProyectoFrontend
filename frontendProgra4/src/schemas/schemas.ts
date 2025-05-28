
import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(3, "Debe tener al menos 3 caracteres"),
  firstLastName: z.string().min(3, "Debe tener al menos 3 caracteres"),
  secondLastName: z.string().min(3, "Debe tener al menos 3 caracteres"),
  email: z.string().email("Correo no válido"),
  password: z.string().min(6, "Debe tener al menos 6 caracteres"),
  role: z.string().optional(),
  id: z.number().optional(),
});
