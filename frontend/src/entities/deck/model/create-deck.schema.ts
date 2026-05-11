import type {Composer} from "vue-i18n";
import {z} from "zod";
import {codeToKey} from "@/shared/i18n";
import {FormFields, validationErrorCodes} from "@/shared/config";

export function createCreateDeckSchema(t: Composer["t"]) {
    return z.object({
        name: z.string()
            .nonempty({
                error: () => t(codeToKey(validationErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.NAME.title)
                })
            }),
        description: z.string()
            .nonempty({
                error: () => t(codeToKey(validationErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.DESCRIPTION.title)
                })
            }),
        isPublic: z.boolean()
            .nonoptional({
                error: () => t(codeToKey(validationErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.IS_PUBLIC.title)
                })
            })
    });
}

export type CreateDeckDto = z.infer<ReturnType<typeof createCreateDeckSchema>>;