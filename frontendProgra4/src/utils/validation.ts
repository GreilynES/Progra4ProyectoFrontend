import { RegisterSchema } from "../schemas/schemas";

export const validateRegisterForm = (value: any): Record<string, string> | null => {
  const validation = RegisterSchema.safeParse(value);
  if (!validation.success) {
    const errors: Record<string, string> = {};
    validation.error.errors.forEach((err) => {
      const field = err.path[0] as string;
      errors[field] = err.message;
    });
    return errors;
  }
  return null;
};
