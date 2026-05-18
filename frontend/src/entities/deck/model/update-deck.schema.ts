import type {Composer} from "vue-i18n";
import {z} from "zod";
import {emptyStringToUndefined} from "@/shared/lib";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

export function createUpdateDeckSchema(t: Composer["t"]) {
    return z.object({
        name: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(2, {
                    error: () => t(codeToKey(codes.MIN_LENGTH), {
                        fieldName: t(codeToKey(codes.NAME_NAME)),
                        n: 2
                    })
                })
        )
            .optional(),
        description: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(2, {
                    error: () => t(codeToKey(codes.MIN_LENGTH), {
                        fieldName: t(codeToKey(codes.DESCRIPTION_NAME)),
                        n: 2
                    })
                }))
            .optional(),
        isPublic: z.boolean()
            .optional(),
    });
}

export type UpdateDeckDto = z.infer<ReturnType<typeof createUpdateDeckSchema>>;