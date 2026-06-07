import { z } from "zod";

export const listSharedDecksSchema = z.object({
  minRating: z.coerce.number().min(1).max(5).optional(),
});

export type ListSharedDecksDto = z.infer<typeof listSharedDecksSchema>;
