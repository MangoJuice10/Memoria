import {createCountSchema} from "@/shared/model/schemas/createCountSchema.schema";
import {createInstructionSchema} from "@/shared/model/schemas/createInstructionSchema.schema";
import type {Composer} from "vue-i18n";
import {z} from "zod";
import {emptyStringToUndefined} from "@/shared/lib";

export function createGenerateFlashcardSchema(t: Composer["t"]) {
    return z.object({
        instruction: z.preprocess(
            emptyStringToUndefined,
            createInstructionSchema(t)
        ),
        count: createCountSchema(t, 1, 20),
    });
}

export type GenerateFlashcardDto = z.infer<ReturnType<typeof createGenerateFlashcardSchema>>;