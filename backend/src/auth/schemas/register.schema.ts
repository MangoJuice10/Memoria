import { z } from "zod";

export const registerSchema = z
  .strictObject({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    path: ["confirmPassword"],
  });

export type RegisterDto = z.infer<typeof registerSchema>;
