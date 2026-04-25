"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountLoginForm = mountLoginForm;
var test_utils_1 = require("@vue/test-utils");
var vue_router_1 = require("vue-router");
var vue_i18n_1 = require("vue-i18n");
var testing_1 = require("@pinia/testing");
var auth_ts_1 = require("@/stores/auth.ts");
var getByTestId_ts_1 = require("@tests/utils/getByTestId.ts");
var LoginForm_vue_1 = require("@/components/auth/login/LoginForm.vue");
function mountLoginForm() {
    var mockRouter = (0, vue_router_1.createRouter)({
        history: (0, vue_router_1.createMemoryHistory)(),
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
    var wrapper = (0, test_utils_1.mount)(LoginForm_vue_1.default, {
        global: {
            plugins: [
                mockRouter,
                (0, vue_i18n_1.createI18n)({
                    legacy: false,
                    locale: "en",
                    messages: {
                        en: {}
                    },
                    missingWarn: false
                }),
                (0, testing_1.createTestingPinia)({
                    stubActions: false
                })
            ]
        }
    });
    return {
        wrapper: wrapper,
        findForm: function () {
            return (0, getByTestId_ts_1.getByTestId)(wrapper, "login-form");
        },
        findEmailInput: function () {
            return (0, getByTestId_ts_1.getByTestId)(wrapper, "email");
        },
        findPasswordInput: function () {
            return (0, getByTestId_ts_1.getByTestId)(wrapper, "password");
        },
        findSubmitButton: function () {
            return (0, getByTestId_ts_1.getByTestId)(wrapper, "submit");
        },
        findResetButton: function () {
            return (0, getByTestId_ts_1.getByTestId)(wrapper, "reset");
        },
        findValidationErrors: function () {
            return [(0, getByTestId_ts_1.getByTestId)(wrapper, "email-validation-error"), (0, getByTestId_ts_1.getByTestId)(wrapper, "password-validation-error")];
        },
        getAuthStore: function () {
            return (0, auth_ts_1.useAuthStore)();
        },
        findAuthError: function () {
            return (0, getByTestId_ts_1.getByTestId)(wrapper, "auth-error");
        },
        mockRouter: mockRouter,
    };
}
