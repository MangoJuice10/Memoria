import {type Ref, type MaybeRefOrGetter, ref, toValue, toRaw, watch} from "vue";
import {z, type ZodType, type ZodIssue} from "zod";
import {groupBy, set, get} from "lodash";
import {debounce} from "./debounce";
import type {ErrorMessage} from "@/shared/types";
import {i18n} from "@/shared/i18n";
import {walkObject} from "@/shared/lib/walkObject.ts";

type ValidationOptions = {
    mode: "lazy",
} | {
    mode: "eager",
    delay: number;
}

export const useValidation = <Schema extends ZodType>(
    data: Ref<z.infer<Schema>>,
    schema: MaybeRefOrGetter<Schema>,
    options?: ValidationOptions
) => {
    const initialData = structuredClone(toRaw(data.value));

    const optionsWithDefaults = Object.assign({
        mode: "lazy"
    }, options);

    const isValid = ref(false);

    const errors = ref<Record<string, ZodIssue[]> | null>(null);
    const getFirstError = (path: string): ErrorMessage => {
        const error = errors.value
            ?.[path]
            ?.[0]
            ?.message;
        return error ? error : null;
    };
    const clearErrors = () => errors.value = null;

    const touched = ref<Record<string, boolean>>({});
    const isTouched = (path: string) => get(touched.value, path, false);
    const touch = (path: string) => set(touched.value, path, true);
    const touchAll = () => {
        walkObject(data.value, touch);
    };

    const parseSchema = async () =>
        await toValue(schema).safeParseAsync(data.value);

    let lastValidationIdx = 0;
    const validate = async () => {
        const validationIdx = ++lastValidationIdx;
        const result = await parseSchema();
        if (validationIdx !== lastValidationIdx) return;

        isValid.value = result.success;
        if (!result.success) {
            errors.value = groupBy(result.error.issues, issue => issue.path.join("."));
        } else {
            errors.value = null;
        }
    };

    const reset = () => {
        touched.value = {};
        clearErrors();
        data.value = structuredClone(initialData);
    };

    const startWatching = (debounceFn: () => void) => {
        watch([
            () => toValue(schema),
            () => data.value
        ], async () => {
            debounceFn();
        }, {deep: true});
    };

    if (optionsWithDefaults.mode == "eager") {
        const validateDebounced = debounce(validate, optionsWithDefaults.delay);
        startWatching(validateDebounced);
    }

    validate()
        .catch(() => {
        });

    watch(i18n.global.locale, () => validate());

    return {
        isValid,
        errors,
        getFirstError,
        clearErrors,
        isTouched,
        touch,
        touchAll,
        validate,
        reset,
    };
};