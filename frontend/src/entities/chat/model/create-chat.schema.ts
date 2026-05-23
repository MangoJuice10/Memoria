import {z} from "zod";
import type {Composer} from "vue-i18n";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

export function createCreateChatSchema(t: Composer["t"]) {
    return z.strictObject({
        title: z.string()
            .nonempty({
                error: () => t(codeToKey(codes.REQUIRED), {
                    fieldName: t(codeToKey(codes.TITLE_NAME))
                })
            }).trim().min(1).max(100).optional(),
    });
}

export type CreateChatDto = z.input<ReturnType<typeof createCreateChatSchema>>;