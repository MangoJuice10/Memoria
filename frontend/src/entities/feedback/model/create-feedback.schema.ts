import {z} from "zod";

export const createFeedbackSchema = z.strictObject({
    content: z.string().min(1),
    rating: z.number().int().min(1).max(5),
});

export type CreateFeedbackDto = z.infer<typeof createFeedbackSchema>;
