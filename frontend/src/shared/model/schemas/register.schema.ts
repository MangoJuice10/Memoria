import {z} from "zod";
import type {Composer} from "vue-i18n";
import {codeToKey} from "@/shared/i18n";
import {errorCodes, formCodes} from "@/shared/config";

export const createRegisterSchema = (t: Composer["t"]) => {
    return z.object({
        username: z.string()
            .nonempty({
                error: () => t(codeToKey(errorCodes.REQUIRED), {
                    fieldName: t(codeToKey(formCodes.USERNAME_NAME)),
                }),
            })
            .min(2, {
                error: () => t(codeToKey(errorCodes.MIN_LENGTH), {
                    fieldName: t(codeToKey(formCodes.USERNAME_NAME)),
                    n: 2
                })
            }),
        email: z.string()
            .nonempty({
                error: () => t(codeToKey(errorCodes.REQUIRED), {
                    fieldName: t(codeToKey(formCodes.EMAIL_NAME))
                })
            })
            .email({
                error: () => t(codeToKey(errorCodes.EMAIL), {
                    fieldName: t(codeToKey(formCodes.EMAIL_NAME))
                })
            }),
        password: z.string()
            .nonempty({
                error: () => t(codeToKey(errorCodes.REQUIRED), {
                    fieldName: t(codeToKey(formCodes.PASSWORD_NAME))
                })
            })
            .min(8, {
                error: () => t(codeToKey(errorCodes.MIN_LENGTH), {
                    fieldName: t(codeToKey(formCodes.PASSWORD_NAME)),
                    n: 8
                })
            }),
        confirmPassword: z.string()
            .nonempty({
                error: () => t(codeToKey(errorCodes.CONFIRM_PASSWORD))
            })
    }).refine(data => data.password === data.confirmPassword, {
        error: () => t(codeToKey(errorCodes.CONFIRM_PASSWORD)),
        path: ["confirmPassword"]
    });
};

export type RegisterDto = z.infer<ReturnType<typeof createRegisterSchema>>;