import {z} from "zod";
import {t} from "@/shared/i18n";

export const loginSchema = z.object({
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
                n: 8,
                fieldName: t("validation.fields.password")
            })
        })
});

export type LoginDto = z.infer<typeof loginSchema>;