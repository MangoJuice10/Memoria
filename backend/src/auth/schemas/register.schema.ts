import { z } from "zod";
import { userInputErrorCodes } from "src/common/constants";

export const registerSchema = z
  .strictObject({
    username: z.string().min(2),
    email: z.email({
      message: userInputErrorCodes.EMAIL,
    }),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    path: ["confirmPassword"],
    message: userInputErrorCodes.CONFIRM_PASSWORD,
  });

export type RegisterDto = z.infer<typeof registerSchema>;