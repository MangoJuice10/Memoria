import { z } from "zod";
import { validationErrorCodes } from "src/common/constants";

const rawUpdateUserSchema = z
  .object({
    newUsername: z.string().min(2).optional(),
    newEmail: z
      .email({
        message: validationErrorCodes.EMAIL,
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
      error: validationErrorCodes.REQUIRED,
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
      error: validationErrorCodes.REQUIRED,
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
      error: validationErrorCodes.REQUIRED,
    },
  )
  .refine(
    ({ oldPassword, newPassword }) => {
      if (oldPassword && newPassword && oldPassword === newPassword) return false;
      return true;
    },
    {
      path: ["newPassword"],
      error: validationErrorCodes.DUPLICATE_PASSWORD,
    },
  )
  .refine(
    ({ newPassword, confirmPassword }) => {
      if (newPassword && confirmPassword && newPassword !== confirmPassword) return false;
      return true;
    },
    {
      path: ["confirmPassword"],
      error: validationErrorCodes.CONFIRM_PASSWORD,
    },
  );

export type UpdateUserDto = z.infer<typeof rawUpdateUserSchema>;

export const updateUserSchema = rawUpdateUserSchema.transform(
  ({ confirmPassword, ...data }) => data,
);
