import {z} from "zod";
import type {Composer} from "vue-i18n";
import {formCodes, validationErrorCodes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

export function createLoginSchema(t: Composer["t"]) {
    return z.object({
        email: z.string()
            .nonempty({
                error: () => t(codeToKey(validationErrorCodes.REQUIRED), {
                    fieldName: t(codeToKey(formCodes.EMAIL_NAME))
                })
            })
            .email({
                error: () => t(codeToKey(validationErrorCodes.EMAIL), {
                    fieldName: t(codeToKey(formCodes.EMAIL_NAME))
                })
            }),
        password: z.string()
            .nonempty({
                error: () => t(codeToKey(validationErrorCodes.REQUIRED), {
                    fieldName: t(codeToKey(formCodes.PASSWORD_NAME))
                })
            })
            .min(8, {
                error: () => t(codeToKey(validationErrorCodes.MIN_LENGTH), {
                    n: 8,
                    fieldName: t(codeToKey(formCodes.PASSWORD_NAME))
                })
            })
    });
}

export type LoginDto = z.infer<ReturnType<typeof createLoginSchema>>;