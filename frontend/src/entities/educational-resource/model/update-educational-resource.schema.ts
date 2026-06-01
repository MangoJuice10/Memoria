import type {Composer} from "vue-i18n";
import {z} from "zod";
import {emptyStringToUndefined} from "@/shared/lib";
import {
    createEducationalResourceDescriptionSchema,
    createEducationalResourceFileSchema,
    createEducationalResourceNameSchema
} from "@/entities/educational-resource/model/educational-resource.schema";

export function createUpdateEducationalResourceSchema(t: Composer["t"]) {
    return z.object({
        name: z.preprocess(
            emptyStringToUndefined,
            createEducationalResourceNameSchema(t)
        )
            .optional(),
        description: z.preprocess(
            emptyStringToUndefined,
            createEducationalResourceDescriptionSchema(t)
        )
            .optional(),
        file: createEducationalResourceFileSchema(t)
            .optional()
    });
}

export type UpdateEducationalResourceInput = z.input<ReturnType<typeof createUpdateEducationalResourceSchema>>;
export type UpdateEducationalResourceDto = z.infer<ReturnType<typeof createUpdateEducationalResourceSchema>>;