import {ref, toValue, type MaybeRef} from "vue";
import {debounce} from "@/utils/debounce";
import type {ValidationError} from "@/types/ValidationError";
import type {Rule} from "@/types/Rule.ts";

// Generic function ensures that both the field and the rules will have compatible types
// Otherwise, it would be possible to overlook a numeric field getting validated against
// string rules, which could result in a runtime error.
export function useFormField<T>(initialValue: MaybeRef<T>, rules: Rule<T>[], options?: {
    debounce?: number;
}) {
    const defaultValue = toValue(initialValue);

    const value = ref(defaultValue);
    const error = ref<ValidationError>(null);
    const validate = () => {
        for (const rule of rules) {
            const validationResult = rule(value.value);
            if (validationResult !== null) {
                error.value = validationResult;
                return false;
            }
        }
        error.value = null;
        return true;
    };

    const delay = options?.debounce ?? 300;
    const validateDebounced = debounce(validate, delay);

    const touched = ref(false);
    const touch = () => touched.value = true;

    function reset() {
        value.value = defaultValue;
        touched.value = false;
        validate();
    }

    // Validate the field upon initialization
    validate();

    return {
        value,
        error,
        touched,
        touch,
        validate,
        validateDebounced,
        reset,
    };
}