import {z} from "zod";
import type {Composer} from "vue-i18n";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

export function createCreateFlashcardSchema(t: Composer["t"]) {
    return z.object({
        front: z.string()
            .nonempty({
                error: () => t(codeToKey(codes.REQUIRED), {
                    fieldName: t(codeToKey(codes.FRONT_NAME))
                })
            })
            .min(2, {
                error: () => t(codeToKey(codes.MIN_LENGTH), {
                    fieldName: t(codeToKey(codes.FRONT_NAME)),
                    n: 2
                })
            }),
        back: z.string()
            .nonempty({
                error: () => t(codeToKey(codes.REQUIRED), {
                    fieldName: t(codeToKey(codes.BACK_NAME))
                })
            })
            .min(2, {
                error: () => t(codeToKey(codes.MIN_LENGTH), {
                    fieldName: t(codeToKey(codes.BACK_NAME)),
                    n: 2
                })
            })
    });
}

export type CreateFlashcardDto = z.infer<ReturnType<typeof createCreateFlashcardSchema>>;