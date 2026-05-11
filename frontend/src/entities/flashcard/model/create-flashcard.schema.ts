import {z} from "zod";
import type {Composer} from "vue-i18n";
import {FormFields, validationErrorCodes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

export function createCreateFlashcardSchema(t: Composer["t"]) {
    return z.object({
        front: z.string()
            .nonempty({
                error: () => t(codeToKey(validationErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.FRONT.title)
                })
            })
            .min(2, {
                error: () => t(codeToKey(validationErrorCodes.MIN_LENGTH), {
                    fieldName: t(FormFields.FRONT.title),
                    n: 2
                })
            }),
        back: z.string()
            .nonempty({
                error: () => t(codeToKey(validationErrorCodes.REQUIRED), {
                    fieldName: t(FormFields.BACK.title)
                })
            })
            .min(2, {
                error: () => t(codeToKey(validationErrorCodes.MIN_LENGTH), {
                    fieldName: t(FormFields.BACK.title),
                    n: 2
                })
            })
    });
}

export type CreateFlashcardDto = z.infer<ReturnType<typeof createCreateFlashcardSchema>>;