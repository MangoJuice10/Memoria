import type {Composer} from "vue-i18n";
import {z} from "zod";
import {emptyStringToUndefined} from "@/shared/lib";
import {errorCodes, formCodes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

export function createUpdateDeckSchema(t: Composer["t"]) {
    return z.object({
        name: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(2, {
                    error: () => t(codeToKey(errorCodes.MIN_LENGTH), {
                        fieldName: t(codeToKey(formCodes.NAME_NAME)),
                        n: 2
                    })
                })
        )
            .optional(),
        description: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(2, {
                    error: () => t(codeToKey(errorCodes.MIN_LENGTH), {
                        fieldName: t(codeToKey(formCodes.DESCRIPTION_NAME)),
                        n: 2
                    })
                }))
            .optional()
    });
}

export type UpdateDeckDto = z.infer<ReturnType<typeof createUpdateDeckSchema>>;