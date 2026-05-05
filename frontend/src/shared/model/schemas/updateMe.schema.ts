import {z} from "zod";
import type {Composer} from "vue-i18n";
import {FormFields, userInputErrorCodes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import {emptyStringToUndefined} from "@/shared/lib";

export const createUpdateMeSchema = (t: Composer["t"]) => {
    return z.object({
        newUsername: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(2, {
                    error: () => t(codeToKey(userInputErrorCodes.MIN_LENGTH), {
                        fieldName: t(FormFields.newUsername.title),
                        n: 2
                    })
                })
                .optional()
        ),
        newEmail: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .email({
                    error: () => t(codeToKey(userInputErrorCodes.EMAIL), {
                        fieldName: t(FormFields.newEmail.title)
                    })
                })
                .min(8, {
                    error: () => t(codeToKey(userInputErrorCodes.MIN_LENGTH), {
                        fieldName: t(FormFields.newEmail.title),
                        n: 8,
                    })
                })
                .optional()
        ),
        oldPassword: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .optional()
        ),
        newPassword: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(8, {
                    error: () => t(codeToKey(userInputErrorCodes.MIN_LENGTH), {
                        fieldName: t(FormFields.newPassword.title),
                        n: 8
                    })
                })
                .optional()
        ),
        confirmPassword: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .optional()
        )
    })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && !oldPassword) return false;
            return true;
        }, {
            path: ["oldPassword"],
            error: () => t(codeToKey(userInputErrorCodes.REQUIRED), {
                fieldName: t(FormFields.oldPassword.title),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && !newPassword) return false;
            return true;
        }, {
            path: ["newPassword"],
            error: () => t(codeToKey(userInputErrorCodes.REQUIRED), {
                fieldName: t(FormFields.newPassword.title),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && !confirmPassword) return false;
            return true;
        }, {
            path: ["confirmPassword"],
            error: () => t(codeToKey(userInputErrorCodes.REQUIRED), {
                fieldName: t(FormFields.confirmPassword.title),
                n: 8
            })
        })
        .refine(({newPassword, confirmPassword}) => {
            if (newPassword && confirmPassword && newPassword !== confirmPassword) return false;
            return true;
        }, {
            path: ["confirmPassword"],
            error: () => t(codeToKey(userInputErrorCodes.CONFIRM_PASSWORD), {
                fieldName: t(FormFields.confirmPassword.title),
                n: 8
            })
        });
};

export type UpdateMeDto = z.infer<ReturnType<typeof createUpdateMeSchema>>;