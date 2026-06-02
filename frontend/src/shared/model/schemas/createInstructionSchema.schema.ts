import {z} from "zod";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import type {Composer} from "vue-i18n";

export function createInstructionSchema(t: Composer["t"]) {
    return z.string({
        error: () => t(codeToKey(codes.REQUIRED), {
            fieldName: t(codeToKey(codes.INSTRUCTION_NAME))
        })
    }).min(10, {
        error: () => t(codeToKey(codes.MIN_LENGTH), {
            fieldName: t(codeToKey(codes.INSTRUCTION_NAME)),
            n: 10
        })
    }).max(10000, {
        error: () => t(codeToKey(codes.MAX_LENGTH), {
            fieldName: t(codeToKey(codes.INSTRUCTION_NAME)),
            n: 10000
        })
    });
}
