import { z } from "zod";

export const reviewRatingSchema = z.enum(["AGAIN", "BAD", "GOOD", "PERFECT"]);

export const reviewFlashcardSchema = z.strictObject({
  rating: reviewRatingSchema,
});

export type ReviewFlashcardDto = z.infer<typeof reviewFlashcardSchema>;
