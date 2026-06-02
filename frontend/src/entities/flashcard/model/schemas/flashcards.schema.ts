import type {Composer} from "vue-i18n";
import {z} from "zod";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

export function createFrontSchema(t: Composer["t"]) {
    return z.string({
        error: () => t(codeToKey(codes.REQUIRED), {
            fieldName: t(codeToKey(codes.FRONT_NAME))
        })
    })
        .min(1, {
            error: () => t(codeToKey(codes.MIN_LENGTH), {
                fieldName: t(codeToKey(codes.FRONT_NAME)),
                n: 1
            })
        });
}

export function createBackSchema(t: Composer["t"]) {
    return z.string({
        error: () => t(codeToKey(codes.REQUIRED), {
            fieldName: t(codeToKey(codes.BACK_NAME))
        })
    })
        .min(1, {
            error: () => t(codeToKey(codes.MIN_LENGTH), {
                fieldName: t(codeToKey(codes.BACK_NAME)),
                n: 1
            })
        });
}


