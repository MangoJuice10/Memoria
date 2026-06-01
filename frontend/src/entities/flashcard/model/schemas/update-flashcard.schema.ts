import {z} from "zod";
import type {Composer} from "vue-i18n";
import {emptyStringToUndefined} from "@/shared/lib";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

export function createUpdateFlashcardSchema(t: Composer["t"]) {
    return z.object({
        front: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(2, {
                    error: () => t(codeToKey(codes.MIN_LENGTH), {
                        fieldName: t(codeToKey(codes.FRONT_NAME)),
                        n: 2
                    })
                })
                .optional()
        ),
        back: z.preprocess(
            emptyStringToUndefined,
            z.string()
                .min(2, {
                    error: () => t(codeToKey(codes.MIN_LENGTH), {
                        fieldName: t(codeToKey(codes.BACK_NAME)),
                        n: 2
                    })
                })
                .optional()
        )
    });
}

export type UpdateFlashcardDto = z.infer<ReturnType<typeof createUpdateFlashcardSchema>>;