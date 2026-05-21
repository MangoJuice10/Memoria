import { z } from "zod";

export const createEducationalResourceSchema = z.strictObject({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
});

export type CreateEducationalResourceDto = z.infer<typeof createEducationalResourceSchema>;
