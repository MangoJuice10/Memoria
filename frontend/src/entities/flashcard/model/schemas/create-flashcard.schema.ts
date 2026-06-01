import type {Composer} from "vue-i18n";
import {z} from "zod";
import {
    createCreateBackSchema,
    createCreateFrontSchema
} from "./flashcards.schema";

export function createCreateFlashcardSchema(t: Composer["t"]) {
    return z.object({
        front: createCreateFrontSchema(t),
        back: createCreateBackSchema(t)
    });
}

export type CreateFlashcardDto = z.infer<ReturnType<typeof createCreateFlashcardSchema>>;