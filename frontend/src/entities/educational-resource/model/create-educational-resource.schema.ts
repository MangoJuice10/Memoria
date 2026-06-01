import type {Composer} from "vue-i18n";
import {z} from "zod";
import {
    createEducationalResourceNameSchema,
    createEducationalResourceDescriptionSchema,
    createEducationalResourceFileSchema,
} from "@/entities/educational-resource/model/educational-resource.schema";
import {emptyStringToUndefined} from "@/shared/lib";

export function createEducationalResourceSchema(t: Composer["t"]) {
    return z.object({
        name: z.preprocess(
            emptyStringToUndefined,
            createEducationalResourceNameSchema(t)
        ),
        description: z.preprocess(
            emptyStringToUndefined,
            createEducationalResourceDescriptionSchema(t)
        ),
        file: createEducationalResourceFileSchema(t)
    });
}

export type CreateEducationalResourceInput = z.input<ReturnType<typeof createEducationalResourceSchema>>;
export type CreateEducationalResourceDto = z.output<ReturnType<typeof createEducationalResourceSchema>>;