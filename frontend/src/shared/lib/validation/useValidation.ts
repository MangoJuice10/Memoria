import {type Ref, type MaybeRefOrGetter, ref, toValue, toRaw, watch} from "vue";
import {z, type ZodError, type ZodType} from "zod";
import {set, get} from "lodash";
import {debounce} from "@/shared/lib/debounce";
import type {ErrorMessage} from "@/shared/model";
import {i18n} from "@/shared/i18n";
import {walkObject} from "@/shared/lib/walkObject";

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

    const errors = ref(new Map<string, string[]>());

    const createErrorsMap = (error: ZodError) => {
        const errorsMap = new Map<string, string[]>();
        for (const issue of error.issues) {
            const path = issue.path.map(String);
            const key = path.join(".");

            const keyErrors = errorsMap.get(key);
            if (keyErrors) {
                keyErrors.push(issue.message);
            } else {
                errorsMap.set(key, [issue.message]);
            }
        }
        return errorsMap;
    }
    const getFirstError = (path: string): ErrorMessage => {
        return errors.value.get(path)?.[0] ?? null;
    };

    const clearErrors = () => errors.value.clear();

    const touched = ref<Record<string, boolean>>({});

    const isFieldTouched = (path: string) => get(touched.value, path, false);

    const isFormTouched = () => {
        let result = false;

        walkObject(touched.value, (path: string) => {
            if (get(touched.value, path) === true) {
                result = true;
            }
        });

        return result;
    };

    const touch = (path: string) => set(touched.value, path, true);

    const touchAll = () => {
        walkObject(data.value, touch);
    };

    const parseSchema = async () =>
        await toValue(schema).safeParseAsync(data.value);

    const validate = async () => {
        const result = await parseSchema();
        isValid.value = result.success;

        if (result.error) {
            errors.value = createErrorsMap(result.error);
            return null;
        }

        errors.value.clear();
        return result.data;
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
        isFieldTouched,
        isFormTouched,
        touch,
        touchAll,
        validate,
        reset,
    };
};