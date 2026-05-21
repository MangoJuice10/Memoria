import {type Ref, type MaybeRefOrGetter, ref, toValue, toRaw, watch} from "vue";
import {z, type ZodError, type ZodType} from "zod";
import {set, get} from "lodash";
import {debounce} from "@/shared/lib/debounce";
import type {ErrorMessage} from "@/shared/model";
import {codeToKey, i18n} from "@/shared/i18n";
import {walkObject} from "@/shared/lib/walkObject";
import type {Composer} from "vue-i18n";
import type {ErrorCode, ValidationErrorCode} from "@/shared/config";
import {type ErrorResponse} from "@/shared/api";

export type DelayOptions = {
    mode: "lazy"
} | {
    mode: "eager",
    delay: number;
}

export type TOptions = {
    formError?: Partial<Record<ErrorCode, Record<string, unknown>>>
} & Record<string, Partial<Record<ValidationErrorCode, Record<string, unknown>>>>

type TranslationOptions = {
    t?: Composer["t"];
    tOptions?: TOptions
}

type ValidationOptions = DelayOptions & TranslationOptions;

export const useValidation = <Schema extends ZodType>(
    data: Ref<z.input<Schema>>,
    schema: MaybeRefOrGetter<Schema>,
    options?: ValidationOptions
) => {
    const initialData = structuredClone(toRaw(data.value));

    const optionsWithDefaults = Object.assign({
        mode: "lazy"
    }, options);

    const isValid = ref(false);

    const clientErrors = ref(new Map<string, string>());
    const serverErrors = ref(new Map<string, string>());
    const formError = ref<string | null>(null);

    const createErrorsMap = (error: ZodError) => {
        const errorsMap = new Map<string, string>();
        for (const issue of error.issues) {
            const path = issue.path.map(String).join(".");

            const pathErrors = errorsMap.get(path);
            if (!pathErrors) {
                errorsMap.set(path, issue.message);
            }
        }
        return errorsMap;
    };

    const getError = (path: string): ErrorMessage => {
        const clientError = clientErrors.value.get(path) ?? null;
        if (clientError) return clientError;
        const serverError = serverErrors.value.get(path) ?? null;
        if (serverError) return serverError;
        return null;
    };

    const getFormError = () => {
        return formError.value;
    };

    const clearClientErrors = () => clientErrors.value.clear();
    const clearServerErrors = () => serverErrors.value.clear();
    const clearFormError = () => formError.value = null;

    const clearErrors = () => {
        clearClientErrors();
        clearServerErrors();
        clearFormError();
    };

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

    const clientValidate = async () => {
        clearErrors();

        const result = await parseSchema();

        isValid.value = result.success;
        if (result.error) clientErrors.value = createErrorsMap(result.error);

        return result;
    };

    const serverValidate = async (errorRes: ErrorResponse) => {
        clearErrors();
        switch (errorRes.statusCode) {
            case 409:
            case 422: {
                if (!errorRes.error.details) break;

                for (const {path, code} of errorRes.error.details) {
                    if (!options?.t) {
                        serverErrors.value.set(path, code);
                        continue;
                    }

                    const tOptions = options.tOptions?.[path]?.[code];
                    if (tOptions) {
                        serverErrors.value.set(path, options.t(codeToKey(code), tOptions));
                        continue;
                    }

                    serverErrors.value.set(path, options.t(codeToKey(code)));
                }
                break;
            }
            default: {
                if (!options?.t) {
                    formError.value = errorRes.error.code;
                    break;
                }

                const tOptions = options.tOptions?.formError?.[errorRes.error.code];
                if (tOptions) {
                    formError.value = options.t(codeToKey(errorRes.error.code), tOptions);
                    break;
                }

                formError.value = options.t(codeToKey(errorRes.error.code));
                break;
            }
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
        const validateDebounced = debounce(clientValidate, optionsWithDefaults.delay);
        startWatching(validateDebounced);
    }

    clientValidate()
        .catch(() => {
        });

    watch(i18n.global.locale, () => clientValidate());

    return {
        isValid,
        getError,
        getFormError,
        clearClientErrors,
        clearServerErrors,
        clearErrors,
        isFieldTouched,
        isFormTouched,
        touch,
        touchAll,
        clientValidate,
        serverValidate,
        reset,
    };
};