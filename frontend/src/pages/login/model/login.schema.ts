import {z} from "zod";
import type {Composer} from "vue-i18n";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

export function createLoginSchema(t: Composer["t"]) {
    return z.object({
        email: z.string()
            .nonempty({
                error: () => t(codeToKey(codes.REQUIRED), {
                    fieldName: t(codeToKey(codes.EMAIL_NAME))
                })
            })
            .email({
                error: () => t(codeToKey(codes.EMAIL), {
                    fieldName: t(codeToKey(codes.EMAIL_NAME))
                })
            }),
        password: z.string()
            .nonempty({
                error: () => t(codeToKey(codes.REQUIRED), {
                    fieldName: t(codeToKey(codes.PASSWORD_NAME))
                })
            })
            .min(8, {
                error: () => t(codeToKey(codes.MIN_LENGTH), {
                    n: 8,
                    fieldName: t(codeToKey(codes.PASSWORD_NAME))
                })
            })
    });
}

export type LoginDto = z.infer<ReturnType<typeof createLoginSchema>>;