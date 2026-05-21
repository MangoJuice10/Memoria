import type {Composer} from "vue-i18n";
import {z} from "zod";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

const ALLOWED_FILE_TYPES = {
    "text/plain": "txt",
    "text/markdown": "md",
    "text/html": "html",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/rtf": "rtf",
    "application/vnd.oasis.opendocument.text": "odt",
    "application/pdf": "pdf",
    "application/epub+zip": "epub"
};
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function createEducationalResourceSchema(t: Composer["t"]) {
    return z.object({
        name: z.string().nonempty({
            error: () => t(codeToKey(codes.REQUIRED), {
                fieldName: t(codeToKey(codes.EDUCATIONAL_RESOURCE_NAME))
            })
        }),
        description: z.string().nonempty({
            error: () => t(codeToKey(codes.REQUIRED), {
                fieldName: t(codeToKey(codes.EDUCATIONAL_RESOURCE_DESCRIPTION))
            })
        }),
        file: z.instanceof(File).nullable()
            .transform((file, ctx) => {
                if (!file) {
                    ctx.addIssue({
                        code: "invalid_type",
                        expected: "file",
                        message: t(codeToKey(codes.REQUIRED), {
                            fieldName: t(codeToKey(codes.EDUCATIONAL_RESOURCE_FILE))
                        }),
                    });
                    return z.NEVER;
                }
                return file;
            })
            .refine((file) => ALLOWED_FILE_TYPES.hasOwnProperty(file.type), {
                error: () => t(codeToKey(codes.INVALID_MIME_TYPE), {
                    allowedTypes: Object.values(ALLOWED_FILE_TYPES).join(", ")
                })
            })
            .refine((file) => file.size <= MAX_FILE_SIZE, {
                error: () => t(codeToKey(codes.MAX_SIZE), {
                    maxSize: MAX_FILE_SIZE
                })
            })
    });
}

export type CreateEducationalResourceInput = z.input<ReturnType<typeof createEducationalResourceSchema>>;
export type CreateEducationalResourceDto = z.output<ReturnType<typeof createEducationalResourceSchema>>;