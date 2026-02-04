import {mount, type VueWrapper} from "@vue/test-utils";
import {createMemoryHistory, createRouter} from "vue-router";
import {createI18n} from "vue-i18n";
import {createTestingPinia} from "@pinia/testing";
import {useAuthStore} from "@/stores/auth";
import {getByTestId} from "@tests/utils/getByTestId";
import type {DOMWrapper} from "@vue/test-utils";
import LoginForm from "@/components/auth/login/LoginForm.vue";

export function mountLoginForm() {
    const mockRouter = createRouter({
        history: createMemoryHistory(),
        routes: [
            {
                path: "/",
                component: {
                    template: "</div>"
                }
            }
        ]
    });

    vi.spyOn(mockRouter, "push").mockResolvedValue(undefined);

    const wrapper: VueWrapper<InstanceType<typeof LoginForm>> = mount(LoginForm, {
        global: {
            plugins: [
                mockRouter,
                createI18n({
                    legacy: false,
                    locale: "en",
                    messages: {
                        en: {}
                    },
                    missingWarn: false
                }),
                createTestingPinia({
                    stubActions: false
                })
            ]
        }
    });
    return {
        wrapper,
        findForm: () => {
            return getByTestId(wrapper, "login-form");
        },
        findEmailInput: () => {
            return getByTestId(wrapper, "email");
        },
        findPasswordInput: () => {
            return getByTestId(wrapper, "password");
        },
        findSubmitButton: () => {
            return getByTestId(wrapper, "submit");
        },
        findResetButton: () => {
            return getByTestId(wrapper, "reset");
        },
        findValidationErrors: (): readonly [DOMWrapper<Element>, DOMWrapper<Element>] => {
            return [getByTestId(wrapper, "email-validation-error"), getByTestId(wrapper, "password-validation-error")];
        },
        getAuthStore: () => {
            return useAuthStore();
        },
        findAuthError: () => {
            return getByTestId(wrapper, "auth-error");
        },
        mockRouter,
    };
}