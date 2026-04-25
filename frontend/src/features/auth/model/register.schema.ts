import {z} from "zod";
import {t} from "@/shared/i18n";

export const registerSchema =
    z.object({
        email: z.string()
            .nonempty({
                error: () => t("validation.rules.required", {
                    fieldName: t("validation.fields.email")
                })
            })
            .email({
                error: () => t("validation.rules.email", {
                    fieldName: t("validation.fields.email")
                })
            }),
        password: z.string()
            .nonempty({
                error: () => t("validation.rules.required", {
                    fieldName: t("validation.fields.password")
                })
            })
            .min(8, {
                error: () => t("validation.rules.minLength", {
                    fieldName: t("validation.fields.password"),
                    n: 8
                })
            }),
        confirmPassword: z.string()
            .nonempty({
                error: () => t("validation.rules.confirmPassword")
            })
    }).refine(data => data.password === data.confirmPassword, {
        error: () => t("validation.rules.confirmPassword"),
        path: ["confirmPassword"]
    });

export type RegisterDto = z.infer<typeof registerSchema>;