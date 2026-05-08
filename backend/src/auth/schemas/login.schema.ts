import { z } from "zod";
import { validationErrorCodes } from "src/common/constants/error-codes.constants";

export const loginSchema = z.strictObject({
  email: z.email({
    message: validationErrorCodes.EMAIL,
  }),
  password: z.string().min(8),
});

export type LoginDto = z.infer<typeof loginSchema>;
