import type {Composer} from "vue-i18n";
import {z} from "zod";
import {createInstructionSchema} from "@/shared/model/schemas/createInstructionSchema.schema";
import {emptyStringToUndefined} from "@/shared/lib";

export function createRegenerateFlashcardSchema(t: Composer["t"]) {
    return z.object({
        instruction: z.preprocess(
            emptyStringToUndefined,
            createInstructionSchema(t)
        ),
    });
}

export type RegenerateFlashcardDto = z.infer<ReturnType<typeof createRegenerateFlashcardSchema>>;