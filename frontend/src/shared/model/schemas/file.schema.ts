import type {Composer} from "vue-i18n";
import {z} from "zod";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

export function createFileSchema(t: Composer["t"], allowedFileTypes: Record<string, string>, maxSize: number) {
    return z.instanceof(File)
        .refine((file) => allowedFileTypes.hasOwnProperty(file.type), {
            error: () => t(codeToKey(codes.INVALID_MIME_TYPE), {
                allowedTypes: Object.values(allowedFileTypes).join(", ")
            }),
        })
        .refine((file) => file.size <= maxSize, {
            error: () => t(codeToKey(codes.MAX_SIZE), {
                maxSize
            }),
        });
}