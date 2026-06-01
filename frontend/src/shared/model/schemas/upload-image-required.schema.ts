import type {Composer} from "vue-i18n";
import {z} from "zod";
import {createFileSchema} from "@/shared/model/schemas/file.schema.ts";

export function createUploadImageRequiredSchema(t: Composer["t"], allowedFileTypes: Record<string, string>, maxSize: number) {
    return z.object({
        image: createFileSchema(t, allowedFileTypes, maxSize)
    });
}

export type UploadImageRequired = z.infer<ReturnType<typeof createUploadImageRequiredSchema>>;