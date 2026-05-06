import {z} from "zod";
import type {Composer} from "vue-i18n";
import {FormFields, userInputErrorCodes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

export function createLoginSchema(t: Composer["t"]) {
    return z.object({
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
                    n: 8,
                    fieldName: t(FormFields.PASSWORD.placeholder)
                })
            })
    });
}

export type LoginDto = z.infer<ReturnType<typeof createLoginSchema>>;