import {createCountSchema} from "@/shared/model/schemas/createCountSchema.schema";
import {createInstructionSchema} from "@/shared/model/schemas/createInstructionSchema.schema";
import type {Composer} from "vue-i18n";
import {z} from "zod";
import {emptyStringToUndefined} from "@/shared/lib";

export function createSplitFlashcardSchema(t: Composer["t"]) {
    return z.object({
        instruction: z.preprocess(
            emptyStringToUndefined,
            createInstructionSchema(t)
                .optional()
        ),
        count: createCountSchema(t, 2, 5)
            .optional(),
    });
}

export type SplitFlashcardDto = z.infer<ReturnType<typeof createSplitFlashcardSchema>>;