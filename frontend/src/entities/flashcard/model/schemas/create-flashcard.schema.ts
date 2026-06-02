import type {Composer} from "vue-i18n";
import {z} from "zod";
import {
    createBackSchema,
    createFrontSchema
} from "./flashcards.schema";

export function createCreateFlashcardSchema(t: Composer["t"]) {
    return z.object({
        front: createFrontSchema(t),
        back: createBackSchema(t)
    });
}

export type CreateFlashcardDto = z.infer<ReturnType<typeof createCreateFlashcardSchema>>;