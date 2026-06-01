import type {Composer} from "vue-i18n";
import {z} from "zod";
import {codeToKey} from "@/shared/i18n";
import {emptyStringToUndefined} from "@/shared/lib";
import {codes} from "@/shared/config";

export function createGenerateFlashcardSchema(t: Composer["t"]) {
    return z.object({
        instruction: z.preprocess(
            emptyStringToUndefined,
            z.string({
                error: () => t(codeToKey(codes.REQUIRED), {
                    fieldName: t(codeToKey(codes.INSTRUCTION_NAME))
                })
            }).min(10, {
                error: () => t(codeToKey(codes.MIN_LENGTH), {
                    fieldName: t(codeToKey(codes.INSTRUCTION_NAME)),
                    n: 10
                })
            })
        ),
        count: z.coerce.number({
            error: () => t(codeToKey(codes.REQUIRED), {
                fieldName: t(codeToKey(codes.COUNT_NAME))
            })
        }).int().positive(),
    });
}

export type GenerateFlashcardDto = z.infer<ReturnType<typeof createGenerateFlashcardSchema>>;