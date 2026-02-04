import {ref} from "vue";
import {vi, describe, it, expect, afterEach} from "vitest";
import {useFormField} from "@/composables/useFormField";
import {rules} from "@/utils/rules";

describe("useFormField", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("should initialize the field with the default value when the initial value is a primitive", () => {
        const {value} = useFormField<string>("", []);
        expect(value.value).toBe("");
    });

    it("should initialize the field with the default value when the initial value is a reference", () => {
        const {value} = useFormField<string>(ref(""), []);
        expect(value.value).toBe("");
    });

    it("should validate the field immediately upon initialization, producing a validation error", () => {
        const {error} = useFormField<string>("", [
            rules.required("Required")
        ]);
        expect(error.value).toBe("Required");
    });

    it("should immediately validate the field without producing errors", () => {
        const {value, error, validateNow} = useFormField<string>("Short string", [
            rules.minLength(13, "Too short")
        ]);
        expect(error.value).toBe("Too short");

        value.value = "Longer string";
        const isValid = validateNow();
        expect(isValid).toBe(true);
        expect(error.value).toBeNull();
    });

    it("should validate the field with the default delay of 300ms without producing errors", () => {
        const {value, error, validateDebounced} = useFormField<string>("", [
            rules.required("Required")
        ]);
        vi.useFakeTimers();
        value.value = "Filled";
        validateDebounced();
        vi.advanceTimersByTime(299);
        expect(error.value).toBe("Required");
        vi.advanceTimersByTime(1);
        expect(error.value).toBeNull();
    });

    it("should validate the field with the delay of 1000ms without producing errors", () => {
        const {value, error, validateDebounced} = useFormField<string>("", [
            rules.required("Required")
        ], {
            debounceDelay: 1000
        });
        vi.useFakeTimers();
        value.value = "Filled";
        validateDebounced();
        vi.advanceTimersByTime(999);
        expect(error.value).toBe("Required");
        vi.advanceTimersByTime(1);
        expect(error.value).toBeNull();
    });

    it("should schedule the field to validate and then cancel the validation without producing errors", async () => {
        const {value, error, validateDebounced} = useFormField<string>("Short string", [
            rules.minLength(13, "Too Short"),
        ]);
        value.value = "Longer string";
        vi.useFakeTimers();
        validateDebounced();
        validateDebounced.cancel();
        await vi.runAllTimersAsync();
        expect(error.value).toBe("Too Short");
    });

    it("should have the field untouched by default", () => {
        const {touched} = useFormField<string>("", []);
        expect(touched.value).toBe(false);
    });

    it("should mark the field as touched", () => {
        const {touched, touch} = useFormField<string>("", []);
        touch();
        expect(touched.value).toBe(true);
    });

    it("should reset the field to the default value when the initial value is a primitive", () => {
        const initialValue = "Hello World";
        const {value, reset} = useFormField<string>(initialValue, []);
        expect(value.value).toBe(initialValue);
        value.value = "Hello TypeScript";
        expect(value.value).toBe("Hello TypeScript");
        reset();
        expect(value.value).toBe(initialValue);
    });

    it("should reset the field to the default value when the initial value is a ref", () => {
        const initialValue = ref("Hello World");
        const {value, reset} = useFormField<string>(initialValue, []);
        expect(value.value).toBe(initialValue.value);
        value.value = "Hello TypeScript";
        expect(value.value).toBe("Hello TypeScript");
        reset();
        expect(value.value).toBe(initialValue.value);
    });
});