import {createFileSchema} from "@/shared/model";
import type {Composer} from "vue-i18n";
import {z} from "zod";
import {codeToKey} from "@/shared/i18n";
import {
    allowedEducationalResourceFileTypes,
    codes, MAX_EDUCATIONAL_RESOURCE_FILE_SIZE,
} from "@/shared/config";

export function createEducationalResourceNameSchema(t: Composer["t"]) {
    return z.string({
        error: () => t(codeToKey(codes.REQUIRED), {
            fieldName: t(codeToKey(codes.NAME_NAME))
        })
    })
        .min(1, {
            error: () => t(codeToKey(codes.MIN_LENGTH), {
                fieldName: t(codeToKey(codes.NAME_NAME)),
                n: 1
            })
        })
        .max(255, {
            error: () => t(codeToKey(codes.MAX_LENGTH), {
                fieldName: t(codeToKey(codes.NAME_NAME)),
                n: 255
            })
        });
}

export function createEducationalResourceDescriptionSchema(t: Composer["t"]) {
    return z.string({
        error: () => t(codeToKey(codes.REQUIRED), {
            fieldName: t(codeToKey(codes.DESCRIPTION_NAME))
        })
    })
        .min(50, {
            error: () => t(codeToKey(codes.MIN_LENGTH), {
                fieldName: t(codeToKey(codes.DESCRIPTION_NAME)),
                n: 50
            })
        })
        .max(10000, {
            error: () => t(codeToKey(codes.MAX_LENGTH), {
                fieldName: t(codeToKey(codes.DESCRIPTION_NAME)),
                n: 10000
            })
        });
}

export function createEducationalResourceFileSchema(t: Composer["t"]) {
    return createFileSchema(t, allowedEducationalResourceFileTypes, MAX_EDUCATIONAL_RESOURCE_FILE_SIZE)
}