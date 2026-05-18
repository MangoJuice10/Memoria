import type {Composer} from "vue-i18n";
import {z} from "zod";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

export function createCreateDeckSchema(t: Composer["t"]) {
    return z.object({
        name: z.string()
            .nonempty({
                error: () => t(codeToKey(codes.REQUIRED), {
                    fieldName: t(codeToKey(codes.NAME_NAME))
                })
            }),
        description: z.string()
            .nonempty({
                error: () => t(codeToKey(codes.REQUIRED), {
                    fieldName: t(codeToKey(codes.DESCRIPTION_NAME))
                })
            }),
        isPublic: z.boolean()
            .nonoptional({
                error: () => t(codeToKey(codes.REQUIRED), {
                    fieldName: t(codeToKey(codes.IS_PUBLIC_NAME))
                })
            })
    });
}

export type CreateDeckDto = z.infer<ReturnType<typeof createCreateDeckSchema>>;