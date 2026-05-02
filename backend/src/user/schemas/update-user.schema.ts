import { z } from "zod";

const rawUpdateUserSchema = z
  .object({
    newUsername: z.string().min(2).optional(),
    newEmail: z.email().optional(),
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
      error: "The old password is required when changing password",
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
      error: "The new password is required when changing password",
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
      error: "The password confirmation is required when changing password",
    },
  )
  .refine(
    ({ newPassword, confirmPassword }) => {
      if (newPassword && confirmPassword && newPassword !== confirmPassword) return false;
      return true;
    },
    {
      path: ["confirmPassword"],
      error: "The passwords must match",
    },
  );

export type UpdateUserDto = z.infer<typeof rawUpdateUserSchema>;

export const updateUserSchema = rawUpdateUserSchema.transform(
  ({ confirmPassword, ...data }) => data,
);