import { z } from "zod";

export const updateEducationalResourceSchema = z.strictObject({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateEducationalResourceDto = z.infer<typeof updateEducationalResourceSchema>;
