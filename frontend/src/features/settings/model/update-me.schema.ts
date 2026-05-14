import {z} from "zod";
import type {Composer} from "vue-i18n";
import {errorCodes, formCodes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import {emptyStringToUndefined} from "@/shared/lib";

export const createUpdateMeSchema = (t: Composer["t"]) => {
    return z.object({
        newUsername: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(2, {
                    error: () => t(codeToKey(errorCodes.MIN_LENGTH), {
                        fieldName: t(codeToKey(formCodes.NEW_USERNAME_NAME)),
                        n: 2
                    })
                })
                .optional()
        ),
        newEmail: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .email({
                    error: () => t(codeToKey(errorCodes.EMAIL), {
                        fieldName: t(codeToKey(formCodes.NEW_EMAIL_NAME))
                    })
                })
                .min(8, {
                    error: () => t(codeToKey(errorCodes.MIN_LENGTH), {
                        fieldName: t(codeToKey(formCodes.NEW_EMAIL_NAME)),
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
                    error: () => t(codeToKey(errorCodes.MIN_LENGTH), {
                        fieldName: t(codeToKey(formCodes.NEW_PASSWORD_NAME)),
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
            error: () => t(codeToKey(errorCodes.REQUIRED), {
                fieldName: t(codeToKey(formCodes.OLD_PASSWORD_NAME)),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && !newPassword) return false;
            return true;
        }, {
            path: ["newPassword"],
            error: () => t(codeToKey(errorCodes.REQUIRED), {
                fieldName: t(codeToKey(formCodes.NEW_PASSWORD_NAME)),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && !confirmPassword) return false;
            return true;
        }, {
            path: ["confirmPassword"],
            error: () => t(codeToKey(errorCodes.REQUIRED), {
                fieldName: t(codeToKey(formCodes.CONFIRM_PASSWORD_NAME)),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && oldPassword === newPassword) return false;
            return true;
        }, {
            path: ["newPassword"],
            error: () => t(codeToKey(errorCodes.DUPLICATE_PASSWORD), {
                fieldName: t(codeToKey(formCodes.NEW_PASSWORD_NAME))
            })
        })
        .refine(({newPassword, confirmPassword}) => {
            if (newPassword && confirmPassword && newPassword !== confirmPassword) return false;
            return true;
        }, {
            path: ["confirmPassword"],
            error: () => t(codeToKey(errorCodes.CONFIRM_PASSWORD), {
                fieldName: t(codeToKey(formCodes.CONFIRM_PASSWORD_NAME)),
                n: 8
            })
        });
};

export type UpdateMeDto = z.infer<ReturnType<typeof createUpdateMeSchema>>;