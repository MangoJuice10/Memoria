import { z } from "zod";
import { userInputErrorCodes } from "src/common/constants/error-codes.constants";

const rawUpdateUserSchema = z
  .object({
    newUsername: z.string().min(2).optional(),
    newEmail: z
      .email({
        message: userInputErrorCodes.EMAIL,
      })
      .optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().min(8).optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    ({ oldPassword, newPassword, confirmPassword }) => {
      const isChangingPassword = oldPassword || newPassword || confirmPassword;

      if (isChangingPassword && !oldPassword) return false;
      return true;
    },
    {
      path: ["oldPassword"],
      error: userInputErrorCodes.REQUIRED,
    },
  )
  .refine(
    ({ oldPassword, newPassword, confirmPassword }) => {
      const isChangingPassword = oldPassword || newPassword || confirmPassword;

      if (isChangingPassword && !newPassword) return false;
      return true;
    },
    {
      path: ["newPassword"],
      error: userInputErrorCodes.REQUIRED,
    },
  )
  .refine(
    ({ oldPassword, newPassword, confirmPassword }) => {
      const isChangingPassword = oldPassword || newPassword || confirmPassword;

      if (isChangingPassword && !confirmPassword) return false;
      return true;
    },
    {
      path: ["confirmPassword"],
      error: userInputErrorCodes.REQUIRED,
    },
  )
  .refine(
    ({ oldPassword, newPassword }) => {
      if (oldPassword && newPassword && oldPassword === newPassword) return false;
      return true;
    },
    {
      path: ["newPassword"],
      error: userInputErrorCodes.DUPLICATE_PASSWORD,
    },
  )
  .refine(
    ({ newPassword, confirmPassword }) => {
      if (newPassword && confirmPassword && newPassword !== confirmPassword) return false;
      return true;
    },
    {
      path: ["confirmPassword"],
      error: userInputErrorCodes.CONFIRM_PASSWORD,
    },
  );

export type UpdateUserDto = z.infer<typeof rawUpdateUserSchema>;

export const updateUserSchema = rawUpdateUserSchema.transform(
  ({ confirmPassword, ...data }) => data,
);
