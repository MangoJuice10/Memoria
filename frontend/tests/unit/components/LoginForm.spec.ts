import {vi, describe, it, expect, beforeEach, afterEach} from "vitest";
import flushPromises from "flush-promises";
import {flushUpdates} from "@tests/unit/helpers/flushUpdates";
import {mountLoginForm} from "@tests/unit/helpers/mountLoginForm.ts";
import type {VueWrapper} from "@vue/test-utils";
import LoginForm from "@/pages/login/ui/LoginForm.vue";

let mountedLoginForm: ReturnType<typeof mountLoginForm>;
let wrapper: VueWrapper<InstanceType<typeof LoginForm>>;
describe("LoginForm", () => {
    let validMockEmail: string, validMockPassword: string;

    beforeEach(async () => {
        mountedLoginForm = mountLoginForm();
        await flushPromises();
        /*
        Vitest is smart enough to indicate TypeScript that it() and afterEach()
        always run after beforeEach(), so no TypeScript errors are thrown due to
        wrapper possibly being undefined.
        */
        ({wrapper} = mountedLoginForm);
        validMockEmail = "validemail@example.com";
        validMockPassword = "validpassword";
    });

    afterEach(() => {
        wrapper.unmount();
        vi.useRealTimers();
        vi.clearAllMocks();
    });

    it("should render empty form inputs", () => {
        const {findEmailInput, findPasswordInput} = mountedLoginForm;
        expect((findEmailInput().element as HTMLInputElement).value).toBe("");
        expect((findPasswordInput().element as HTMLInputElement).value).toBe("");
    });

    it("should not render any validation errors", () => {
        const {findValidationErrors} = mountedLoginForm;
        const [emailError, passwordError] = findValidationErrors();
        expect(emailError.text()).toBe("");
        expect(passwordError.text()).toBe("");
    });

    it("should have the submit button in disabled state", async () => {
        const {findSubmitButton} = mountedLoginForm;
        expect(findSubmitButton().attributes("disabled")).toBeDefined();
    });

    it("should show validation errors on submitting an invalid form without user interaction", async () => {
        const {findForm, findValidationErrors} = mountedLoginForm;
        const [emailError, passwordError] = findValidationErrors();
        // Submit manually, as the submit button is disabled when the fields are invalid
        await findForm().trigger("submit");
        await flushUpdates(wrapper);
        expect(emailError.text()).not.toBe("");
        expect(passwordError.text()).not.toBe("");
    });

    it("should show validation errors on blur", async () => {
        const {findEmailInput, findPasswordInput, findValidationErrors} = mountedLoginForm;
        const [emailError, passwordError] = findValidationErrors();
        await findEmailInput().trigger("blur");
        await flushUpdates(wrapper);
        expect(emailError.text()).not.toBe("");

        await findPasswordInput().trigger("blur");
        await wrapper.vm.$nextTick();
        expect(passwordError.text()).not.toBe("");
    });

    it("should show validation errors for invalid fields", async () => {
        const {findEmailInput, findPasswordInput, findValidationErrors} = mountedLoginForm;

        const [emailError, passwordError] = findValidationErrors();
        vi.useFakeTimers();
        await findEmailInput().setValue("invalid");
        await findEmailInput().trigger("blur");
        // Wait for the debounced validate function to run
        // Wait for Vue to flush pending reactive updates to the DOM
        await flushUpdates(wrapper);
        expect(emailError.text()).not.toBe("");

        await findPasswordInput().setValue("invalid");
        await findPasswordInput().trigger("blur");
        await flushUpdates(wrapper);
        expect(passwordError.text()).not.toBe("");
    });

    it("should have the submit button in enabled state", async () => {
        const {findEmailInput, findPasswordInput, findSubmitButton} = mountedLoginForm;
        vi.useFakeTimers();
        await findEmailInput().setValue(validMockEmail);
        await findPasswordInput().setValue(validMockPassword);
        await vi.runAllTimersAsync();
        await wrapper.vm.$nextTick();
        expect(findSubmitButton().attributes("disabled")).toBeUndefined();
    });

    it("should simulate a successful login", async () => {
        const {findForm, findEmailInput, findPasswordInput, getAuthStore, mockRouter} = mountedLoginForm;

        vi.useFakeTimers();
        await findEmailInput().setValue(validMockEmail);
        await findPasswordInput().setValue(validMockPassword);
        await vi.runAllTimersAsync();
        await wrapper.vm.$nextTick();

        const auth = getAuthStore();
        const mockLogin = vi.spyOn(auth, "login").mockResolvedValue(undefined);
        await mockRouter.isReady();

        await findForm().trigger("submit");
        await flushPromises();
        await wrapper.vm.$nextTick();
        expect(mockLogin).toHaveBeenCalledWith(validMockEmail, validMockPassword);
        expect(mockLogin).toHaveBeenCalledOnce();
        expect(mockRouter.push).toHaveBeenCalledWith("/");
    });

    it("should simulate a login failure", async () => {
        const {findForm, findEmailInput, findPasswordInput, getAuthStore, findAuthError, mockRouter} = mountedLoginForm;
        vi.useFakeTimers();
        await findEmailInput().setValue(validMockEmail);
        await findPasswordInput().setValue(validMockPassword);
        await vi.runAllTimersAsync();
        await wrapper.vm.$nextTick();

        const auth = getAuthStore();
        const mockLogin = vi.spyOn(auth, "login").mockRejectedValue(undefined);
        await mockRouter.isReady();

        await findForm().trigger("submit");
        await flushPromises();
        await wrapper.vm.$nextTick();

        expect(mockLogin).toHaveBeenCalledWith(validMockEmail, validMockPassword);
        expect(mockLogin).toHaveBeenCalledOnce();
        expect(findAuthError().text()).not.toBe("");
        expect(mockRouter.push).not.toHaveBeenCalled();
    })

    it("should reset the form", async () => {
        const {findEmailInput, findPasswordInput, findValidationErrors, findResetButton} = mountedLoginForm;
        const emailInput = findEmailInput();
        const passwordInput = findPasswordInput();
        const [emailError, passwordError] = findValidationErrors();
        vi.useFakeTimers();
        await emailInput.setValue("invalid");
        await passwordInput.setValue("invalid");
        await vi.runAllTimersAsync();
        await wrapper.vm.$nextTick();
        await findResetButton().trigger("click");
        await wrapper.vm.$nextTick();
        expect((emailInput.element as HTMLInputElement).value).toBe("");
        expect((passwordInput.element as HTMLInputElement).value).toBe("");
        expect(emailError.text()).toBe("");
        expect(passwordError.text()).toBe("");
    });
});