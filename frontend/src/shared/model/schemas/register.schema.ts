import {z} from "zod";
import type {Composer} from "vue-i18n";
import {FormFields, userInputErrorCodes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

export const createRegisterSchema = (t: Composer["t"]) => {
    return z.object({
        username: z.string()
            .nonempty({
                error: () => t(codeToKey(userInputErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.username.title),
                }),
            })
            .min(2, {
                error: () => t(codeToKey(userInputErrorCodes.MIN_LENGTH), {
                    fieldName: t(FormFields.username.title),
                    n: 2
                })
            }),
        email: z.string()
            .nonempty({
                error: () => t(codeToKey(userInputErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.email.title)
                })
            })
            .email({
                error: () => t(codeToKey(userInputErrorCodes.EMAIL), {
                    fieldName: t(FormFields.email.placeholder)
                })
            }),
        password: z.string()
            .nonempty({
                error: () => t(codeToKey(userInputErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.password.title)
                })
            })
            .min(8, {
                error: () => t(codeToKey(userInputErrorCodes.MIN_LENGTH), {
                    fieldName: t(FormFields.password.placeholder),
                    n: 8
                })
            }),
        confirmPassword: z.string()
            .nonempty({
                error: () => t(codeToKey(userInputErrorCodes.CONFIRM_PASSWORD))
            })
    }).refine(data => data.password === data.confirmPassword, {
        error: () => t(codeToKey(userInputErrorCodes.CONFIRM_PASSWORD)),
        path: ["confirmPassword"]
    });
};

export type RegisterDto = z.infer<ReturnType<typeof createRegisterSchema>>;