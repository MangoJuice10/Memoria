import { z } from "zod";
import { validationErrorCodes } from "src/common/constants";

export const registerSchema = z
  .strictObject({
    username: z.string().min(2),
    email: z.email({
      message: validationErrorCodes.EMAIL,
    }),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    path: ["confirmPassword"],
    message: validationErrorCodes.CONFIRM_PASSWORD,
  });

export type RegisterDto = z.infer<typeof registerSchema>;