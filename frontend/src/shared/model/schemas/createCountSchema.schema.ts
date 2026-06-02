import {z} from "zod";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import type {Composer} from "vue-i18n";

export function createCountSchema(t: Composer["t"], min: number, max: number) {
    return z.coerce.number({
        error: () => t(codeToKey(codes.REQUIRED), {
            fieldName: t(codeToKey(codes.COUNT_NAME))
        })
    })
        .int()
        .min(min, {
            error: () => t(codeToKey(codes.MIN), {
                fieldName: t(codeToKey(codes.COUNT_NAME))
            })
        })
        .max(max, {
            error: () => t(codeToKey(codes.MAX), {
                fieldName: t(codeToKey(codes.COUNT_NAME))
            })
        });
}