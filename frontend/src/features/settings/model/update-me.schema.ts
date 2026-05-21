import {z} from "zod";
import type {Composer} from "vue-i18n";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import {emptyStringToUndefined} from "@/shared/lib";

export const createUpdateMeSchema = (t: Composer["t"]) => {
    return z.object({
        newUsername: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(2, {
                    error: () => t(codeToKey(codes.MIN_LENGTH), {
                        fieldName: t(codeToKey(codes.NEW_USERNAME_NAME)),
                        n: 2
                    })
                })
        ).optional(),
        newEmail: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .email({
                    error: () => t(codeToKey(codes.EMAIL), {
                        fieldName: t(codeToKey(codes.NEW_EMAIL_NAME))
                    })
                })
                .min(8, {
                    error: () => t(codeToKey(codes.MIN_LENGTH), {
                        fieldName: t(codeToKey(codes.NEW_EMAIL_NAME)),
                        n: 8,
                    })
                })
        ).optional(),
        oldPassword: z.preprocess(
            emptyStringToUndefined,
            z.string()
        ).optional(),
        newPassword: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(8, {
                    error: () => t(codeToKey(codes.MIN_LENGTH), {
                        fieldName: t(codeToKey(codes.NEW_PASSWORD_NAME)),
                        n: 8
                    })
                })
        ).optional(),
        confirmPassword: z.preprocess(
            emptyStringToUndefined,
            z.string()
        ).optional()
    })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && !oldPassword) return false;
            return true;
        }, {
            path: ["oldPassword"],
            error: () => t(codeToKey(codes.REQUIRED), {
                fieldName: t(codeToKey(codes.OLD_PASSWORD_NAME)),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && !newPassword) return false;
            return true;
        }, {
            path: ["newPassword"],
            error: () => t(codeToKey(codes.REQUIRED), {
                fieldName: t(codeToKey(codes.NEW_PASSWORD_NAME)),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && !confirmPassword) return false;
            return true;
        }, {
            path: ["confirmPassword"],
            error: () => t(codeToKey(codes.REQUIRED), {
                fieldName: t(codeToKey(codes.CONFIRM_PASSWORD_NAME)),
                n: 8
            })
        })
        .refine(({oldPassword, newPassword, confirmPassword}) => {
            const isChangingPassword = oldPassword || newPassword || confirmPassword;

            if (isChangingPassword && oldPassword === newPassword) return false;
            return true;
        }, {
            path: ["newPassword"],
            error: () => t(codeToKey(codes.DUPLICATE_PASSWORD), {
                fieldName: t(codeToKey(codes.NEW_PASSWORD_NAME))
            })
        })
        .refine(({newPassword, confirmPassword}) => {
            if (newPassword && confirmPassword && newPassword !== confirmPassword) return false;
            return true;
        }, {
            path: ["confirmPassword"],
            error: () => t(codeToKey(codes.CONFIRM_PASSWORD), {
                fieldName: t(codeToKey(codes.CONFIRM_PASSWORD_NAME)),
                n: 8
            })
        });
};

export type UpdateMeInput = z.input<ReturnType<typeof createUpdateMeSchema>>;
export type UpdateMeDto = z.output<ReturnType<typeof createUpdateMeSchema>>;