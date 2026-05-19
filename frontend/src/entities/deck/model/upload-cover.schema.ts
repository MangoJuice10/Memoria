import type {Composer} from "vue-i18n";
import {z} from "zod";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function createUploadCoverSchema(t: Composer["t"]) {
    return z
        .instanceof(File)
        .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
            error: () => t(codeToKey(codes.INVALID_MIME_TYPE), {
                supportedTypes: ALLOWED_FILE_TYPES.join(", ").replace(/image\//g, "")
            }),
            path: ["cover"]
        })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            error: () => t(codeToKey(codes.MAX_SIZE), {
                maxSize: MAX_FILE_SIZE
            }),
            path: ["cover"]
        })
        .nullable();
}