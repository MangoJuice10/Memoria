import {ref, toValue, type MaybeRef} from "vue";
import {debounce} from "@/utils/debounce";
import type {ValidationError} from "@/types/ValidationError";
import type {Rule} from "@/types/Rule.ts";

// Generic function ensures that both the field and the rules will have compatible types
// Otherwise, it would be possible to overlook a numeric field getting validated against
// string rules, which could result in a runtime error.
export function useFormField<T>(initialValue: MaybeRef<T>, rules: Rule<T>[], options?: {
    debounceDelay?: number;
}) {
    const defaultValue = toValue(initialValue);
    const value = ref(defaultValue);
    const error = ref<ValidationError>(null);
    const touched = ref(false);

    const init = () => {
        value.value = defaultValue;
        touched.value = false;
        initError();
    }

    const initError = () => {
        for (const rule of rules) {
            const validationResult = rule(value.value);
            if (validationResult !== null) {
                error.value = validationResult;
                return;
            }
        }
        error.value = null;
    }

    const validate = () => {
        initError();
        touch();
        return error.value === null;
    }

    const validateNow = () => {
        validateDebounced.cancel();
        return validate();
    };

    const delay = options?.debounceDelay ?? 300;
    const validateDebounced = debounce(validate, delay);

    const touch = () => touched.value = true;

    const reset = () => {
        init();
    }

    init();

    return {
        value,
        error,
        touched,
        touch,
        validateNow,
        validateDebounced,
        reset,
    };
}