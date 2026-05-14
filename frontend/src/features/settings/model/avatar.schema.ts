import {z} from "zod";
import type {Composer} from "vue-i18n";
import {errorCodes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function createAvatarSchema(t: Composer["t"]) {
    return z
        .instanceof(File)
        .refine(file => ALLOWED_FILE_TYPES.includes(file.type), {
            error: () => t(codeToKey(errorCodes.INVALID_TYPE), {
                supportedTypes: ALLOWED_FILE_TYPES.join(", "),
            })
        })
        .refine(file => file.size <= MAX_FILE_SIZE, {
            error: () => t(codeToKey(errorCodes.MAX_SIZE), {
                maxSize: MAX_FILE_SIZE,
            })
        });
}