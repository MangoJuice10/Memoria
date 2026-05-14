import type {Composer} from "vue-i18n";
import {z} from "zod";
import {codeToKey} from "@/shared/i18n";
import {errorCodes, formCodes} from "@/shared/config";

export function createCreateDeckSchema(t: Composer["t"]) {
    return z.object({
        name: z.string()
            .nonempty({
                error: () => t(codeToKey(errorCodes.REQUIRED), {
                    fieldName: t(codeToKey(formCodes.NAME_NAME))
                })
            }),
        description: z.string()
            .nonempty({
                error: () => t(codeToKey(errorCodes.REQUIRED), {
                    fieldName: t(codeToKey(formCodes.DESCRIPTION_NAME))
                })
            }),
        isPublic: z.boolean()
            .nonoptional({
                error: () => t(codeToKey(errorCodes.REQUIRED), {
                    fieldName: t(codeToKey(formCodes.IS_PUBLIC_NAME))
                })
            })
    });
}

export type CreateDeckDto = z.infer<ReturnType<typeof createCreateDeckSchema>>;