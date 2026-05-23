import {z} from "zod";
import type {Composer} from "vue-i18n";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

export function createCreateChatMessageSchema(t: Composer["t"]) {
    return z.strictObject({
        content: z.string()
            .nonempty({
                // Zod uses default error messages for the falsy values, henceforth using "" isn't an option
                error: () => " "
            }).trim().min(1).max(4000),
    });
}

export type CreateChatMessageDto = z.input<ReturnType<typeof createCreateChatMessageSchema>>;