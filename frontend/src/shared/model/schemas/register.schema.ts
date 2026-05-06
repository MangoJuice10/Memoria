import {z} from "zod";
import type {Composer} from "vue-i18n";
import {FormFields, userInputErrorCodes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

export const createRegisterSchema = (t: Composer["t"]) => {
    return z.object({
        username: z.string()
            .nonempty({
                error: () => t(codeToKey(userInputErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.USERNAME.title),
                }),
            })
            .min(2, {
                error: () => t(codeToKey(userInputErrorCodes.MIN_LENGTH), {
                    fieldName: t(FormFields.USERNAME.title),
                    n: 2
                })
            }),
        email: z.string()
            .nonempty({
                error: () => t(codeToKey(userInputErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.EMAIL.title)
                })
            })
            .email({
                error: () => t(codeToKey(userInputErrorCodes.EMAIL), {
                    fieldName: t(FormFields.EMAIL.placeholder)
                })
            }),
        password: z.string()
            .nonempty({
                error: () => t(codeToKey(userInputErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.PASSWORD.title)
                })
            })
            .min(8, {
                error: () => t(codeToKey(userInputErrorCodes.MIN_LENGTH), {
                    fieldName: t(FormFields.PASSWORD.placeholder),
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