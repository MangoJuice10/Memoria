import type {Composer} from "vue-i18n";
import {z} from "zod";
import {createFileSchema} from "@/shared/model/schemas/file.schema.ts";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

export function createUploadImageRequiredSchema(t: Composer["t"], allowedFileTypes: Record<string, string>, maxSize: number) {
    return z.object({
        image: createFileSchema(t, allowedFileTypes, maxSize)
            .nullable()
            .transform((file, ctx) => {
                if (!file) {
                    ctx.addIssue({
                        code: "invalid_type",
                        expected: "file",
                        message: t(codeToKey(codes.REQUIRED), {
                            fieldName: t(codeToKey(codes.FILE_NAME))
                        }),
                    });
                    return z.NEVER;
                }
                return file;
            })
    });
}

export type UploadImageRequiredInput = z.input<ReturnType<typeof createUploadImageRequiredSchema>>;
export type UploadImageRequiredOutput = z.infer<ReturnType<typeof createUploadImageRequiredSchema>>;