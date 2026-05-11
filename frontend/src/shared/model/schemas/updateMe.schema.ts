import {z} from "zod";
import type {Composer} from "vue-i18n";
import {FormFields, validationErrorCodes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import {emptyStringToUndefined} from "@/shared/lib";

export const createUpdateMeSchema = (t: Composer["t"]) => {
    return z.object({
        newUsername: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(2, {
                    error: () => t(codeToKey(validationErrorCodes.MIN_LENGTH), {
                        fieldName: t(FormFields.NEW_USERNAME.title),
                        n: 2
                    })
                })
                .optional()
        ),
        newEmail: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .email({
                    error: () => t(codeToKey(validationErrorCodes.EMAIL), {
                        fieldName: t(FormFields.NEW_EMAIL.title)
                    })
                })
                .min(8, {
                    error: () => t(codeToKey(validationErrorCodes.MIN_LENGTH), {
                        fieldName: t(FormFields.NEW_EMAIL.title),
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
                    error: () => t(codeToKey(validationErrorCodes.MIN_LENGTH), {
                        fieldName: t(FormFields.NEW_PASSWORD.title),
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
            error: () => t(codeToKey(validationErrorCodes.REQUIRED), {
                fieldName: t(FormFields.OLD_PASSWORD.title),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && !newPassword) return false;
            return true;
        }, {
            path: ["newPassword"],
            error: () => t(codeToKey(validationErrorCodes.REQUIRED), {
                fieldName: t(FormFields.NEW_PASSWORD.title),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && !confirmPassword) return false;
            return true;
        }, {
            path: ["confirmPassword"],
            error: () => t(codeToKey(validationErrorCodes.REQUIRED), {
                fieldName: t(FormFields.CONFIRM_PASSWORD.title),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && oldPassword === newPassword) return false;
            return true;
        }, {
            path: ["newPassword"],
            error: () => t(codeToKey(validationErrorCodes.DUPLICATE_PASSWORD), {
                fieldName: t(FormFields.NEW_PASSWORD.title)
            })
        })
        .refine(({newPassword, confirmPassword}) => {
            if (newPassword && confirmPassword && newPassword !== confirmPassword) return false;
            return true;
        }, {
            path: ["confirmPassword"],
            error: () => t(codeToKey(validationErrorCodes.CONFIRM_PASSWORD), {
                fieldName: t(FormFields.CONFIRM_PASSWORD.title),
                n: 8
            })
        });
};

export type UpdateMeDto = z.infer<ReturnType<typeof createUpdateMeSchema>>;