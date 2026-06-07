import { z } from "zod";

export const reviewRatingSchema = z.enum(["AGAIN", "BAD", "GOOD", "PERFECT"]);

export const reviewSchema = z.strictObject({
  rating: reviewRatingSchema,
  startedAt: z.iso.datetime(),
});

export type ReviewDto = z.infer<typeof reviewSchema>;
