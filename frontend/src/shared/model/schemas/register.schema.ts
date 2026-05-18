import {z} from "zod";
import type {Composer} from "vue-i18n";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

export const createRegisterSchema = (t: Composer["t"]) => {
    return z.object({
        username: z.string()
            .nonempty({
                error: () => t(codeToKey(codes.REQUIRED), {
                    fieldName: t(codeToKey(codes.USERNAME_NAME)),
                }),
            })
            .min(2, {
                error: () => t(codeToKey(codes.MIN_LENGTH), {
                    fieldName: t(codeToKey(codes.USERNAME_NAME)),
                    n: 2
                })
            }),
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
                    fieldName: t(codeToKey(codes.PASSWORD_NAME)),
                    n: 8
                })
            }),
        confirmPassword: z.string()
            .nonempty({
                error: () => t(codeToKey(codes.CONFIRM_PASSWORD))
            })
    }).refine(data => data.password === data.confirmPassword, {
        error: () => t(codeToKey(codes.CONFIRM_PASSWORD)),
        path: ["confirmPassword"]
    });
};

export type RegisterDto = z.infer<ReturnType<typeof createRegisterSchema>>;