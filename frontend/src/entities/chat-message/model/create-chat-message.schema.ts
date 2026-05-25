import {z} from "zod";

export function createCreateChatMessageSchema() {
    return z.strictObject({
        content: z.string()
            .nonempty({
                // Zod uses default error messages for the falsy values, henceforth using "" isn't an option
                error: () => " "
            }).trim().min(1).max(4000),
    });
}

export type CreateChatMessageDto = z.input<ReturnType<typeof createCreateChatMessageSchema>>;