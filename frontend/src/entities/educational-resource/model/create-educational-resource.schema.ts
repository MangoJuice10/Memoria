import type {Composer} from "vue-i18n";
import {z} from "zod";
import {codeToKey} from "@/shared/i18n";
import {
    allowedEducationalResourceFileTypes,
    codes,
    MAX_EDUCATIONAL_RESOURCE_FILE_SIZE
} from "@/shared/config";

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
            .refine((file) => allowedEducationalResourceFileTypes.hasOwnProperty(file.type), {
                error: () => t(codeToKey(codes.INVALID_MIME_TYPE), {
                    allowedTypes: Object.values(allowedEducationalResourceFileTypes).join(", ")
                })
            })
            .refine((file) => file.size <= MAX_EDUCATIONAL_RESOURCE_FILE_SIZE, {
                error: () => t(codeToKey(codes.MAX_SIZE), {
                    maxSize: MAX_EDUCATIONAL_RESOURCE_FILE_SIZE
                })
            })
    });
}

export type CreateEducationalResourceInput = z.input<ReturnType<typeof createEducationalResourceSchema>>;
export type CreateEducationalResourceDto = z.output<ReturnType<typeof createEducationalResourceSchema>>;