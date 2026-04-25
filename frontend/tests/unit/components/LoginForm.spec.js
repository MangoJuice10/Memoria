"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var flush_promises_1 = require("flush-promises");
var flushUpdates_1 = require("@tests/unit/helpers/flushUpdates");
var mountLoginForm_ts_1 = require("@tests/unit/helpers/mountLoginForm.ts");
var mountedLoginForm;
var wrapper;
(0, vitest_1.describe)("LoginForm", function () {
    var validMockEmail, validMockPassword;
    (0, vitest_1.beforeEach)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mountedLoginForm = (0, mountLoginForm_ts_1.mountLoginForm)();
                    return [4 /*yield*/, (0, flush_promises_1.default)()];
                case 1:
                    _a.sent();
                    /*
                    Vitest is smart enough to indicate TypeScript that it() and afterEach()
                    always run after beforeEach(), so no TypeScript errors are thrown due to
                    wrapper possibly being undefined.
                    */
                    (wrapper = mountedLoginForm.wrapper);
                    validMockEmail = "validemail@example.com";
                    validMockPassword = "validpassword";
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.afterEach)(function () {
        wrapper.unmount();
        vitest_1.vi.useRealTimers();
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)("should render empty form inputs", function () {
        var findEmailInput = mountedLoginForm.findEmailInput, findPasswordInput = mountedLoginForm.findPasswordInput;
        (0, vitest_1.expect)(findEmailInput().element.value).toBe("");
        (0, vitest_1.expect)(findPasswordInput().element.value).toBe("");
    });
    (0, vitest_1.it)("should not render any validation errors", function () {
        var findValidationErrors = mountedLoginForm.findValidationErrors;
        var _a = findValidationErrors(), emailError = _a[0], passwordError = _a[1];
        (0, vitest_1.expect)(emailError.text()).toBe("");
        (0, vitest_1.expect)(passwordError.text()).toBe("");
    });
    (0, vitest_1.it)("should have the submit button in disabled state", function () { return __awaiter(void 0, void 0, void 0, function () {
        var findSubmitButton;
        return __generator(this, function (_a) {
            findSubmitButton = mountedLoginForm.findSubmitButton;
            (0, vitest_1.expect)(findSubmitButton().attributes("disabled")).toBeDefined();
            return [2 /*return*/];
        });
    }); });
    (0, vitest_1.it)("should show validation errors on submitting an invalid form without user interaction", function () { return __awaiter(void 0, void 0, void 0, function () {
        var findForm, findValidationErrors, _a, emailError, passwordError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    findForm = mountedLoginForm.findForm, findValidationErrors = mountedLoginForm.findValidationErrors;
                    _a = findValidationErrors(), emailError = _a[0], passwordError = _a[1];
                    // Submit manually, as the submit button is disabled when the fields are invalid
                    return [4 /*yield*/, findForm().trigger("submit")];
                case 1:
                    // Submit manually, as the submit button is disabled when the fields are invalid
                    _b.sent();
                    return [4 /*yield*/, (0, flushUpdates_1.flushUpdates)(wrapper)];
                case 2:
                    _b.sent();
                    (0, vitest_1.expect)(emailError.text()).not.toBe("");
                    (0, vitest_1.expect)(passwordError.text()).not.toBe("");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)("should show validation errors on blur", function () { return __awaiter(void 0, void 0, void 0, function () {
        var findEmailInput, findPasswordInput, findValidationErrors, _a, emailError, passwordError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    findEmailInput = mountedLoginForm.findEmailInput, findPasswordInput = mountedLoginForm.findPasswordInput, findValidationErrors = mountedLoginForm.findValidationErrors;
                    _a = findValidationErrors(), emailError = _a[0], passwordError = _a[1];
                    return [4 /*yield*/, findEmailInput().trigger("blur")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, (0, flushUpdates_1.flushUpdates)(wrapper)];
                case 2:
                    _b.sent();
                    (0, vitest_1.expect)(emailError.text()).not.toBe("");
                    return [4 /*yield*/, findPasswordInput().trigger("blur")];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 4:
                    _b.sent();
                    (0, vitest_1.expect)(passwordError.text()).not.toBe("");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)("should show validation errors for invalid fields", function () { return __awaiter(void 0, void 0, void 0, function () {
        var findEmailInput, findPasswordInput, findValidationErrors, _a, emailError, passwordError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    findEmailInput = mountedLoginForm.findEmailInput, findPasswordInput = mountedLoginForm.findPasswordInput, findValidationErrors = mountedLoginForm.findValidationErrors;
                    _a = findValidationErrors(), emailError = _a[0], passwordError = _a[1];
                    vitest_1.vi.useFakeTimers();
                    return [4 /*yield*/, findEmailInput().setValue("invalid")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, findEmailInput().trigger("blur")];
                case 2:
                    _b.sent();
                    // Wait for the debounced validate function to run
                    // Wait for Vue to flush pending reactive updates to the DOM
                    return [4 /*yield*/, (0, flushUpdates_1.flushUpdates)(wrapper)];
                case 3:
                    // Wait for the debounced validate function to run
                    // Wait for Vue to flush pending reactive updates to the DOM
                    _b.sent();
                    (0, vitest_1.expect)(emailError.text()).not.toBe("");
                    return [4 /*yield*/, findPasswordInput().setValue("invalid")];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, findPasswordInput().trigger("blur")];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, (0, flushUpdates_1.flushUpdates)(wrapper)];
                case 6:
                    _b.sent();
                    (0, vitest_1.expect)(passwordError.text()).not.toBe("");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)("should have the submit button in enabled state", function () { return __awaiter(void 0, void 0, void 0, function () {
        var findEmailInput, findPasswordInput, findSubmitButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findEmailInput = mountedLoginForm.findEmailInput, findPasswordInput = mountedLoginForm.findPasswordInput, findSubmitButton = mountedLoginForm.findSubmitButton;
                    vitest_1.vi.useFakeTimers();
                    return [4 /*yield*/, findEmailInput().setValue(validMockEmail)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, findPasswordInput().setValue(validMockPassword)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, vitest_1.vi.runAllTimersAsync()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 4:
                    _a.sent();
                    (0, vitest_1.expect)(findSubmitButton().attributes("disabled")).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)("should simulate a successful login", function () { return __awaiter(void 0, void 0, void 0, function () {
        var findForm, findEmailInput, findPasswordInput, getAuthStore, mockRouter, auth, mockLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findForm = mountedLoginForm.findForm, findEmailInput = mountedLoginForm.findEmailInput, findPasswordInput = mountedLoginForm.findPasswordInput, getAuthStore = mountedLoginForm.getAuthStore, mockRouter = mountedLoginForm.mockRouter;
                    vitest_1.vi.useFakeTimers();
                    return [4 /*yield*/, findEmailInput().setValue(validMockEmail)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, findPasswordInput().setValue(validMockPassword)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, vitest_1.vi.runAllTimersAsync()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 4:
                    _a.sent();
                    auth = getAuthStore();
                    mockLogin = vitest_1.vi.spyOn(auth, "login").mockResolvedValue(undefined);
                    return [4 /*yield*/, mockRouter.isReady()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, findForm().trigger("submit")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, flush_promises_1.default)()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 8:
                    _a.sent();
                    (0, vitest_1.expect)(mockLogin).toHaveBeenCalledWith(validMockEmail, validMockPassword);
                    (0, vitest_1.expect)(mockLogin).toHaveBeenCalledOnce();
                    (0, vitest_1.expect)(mockRouter.push).toHaveBeenCalledWith("/");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)("should simulate a login failure", function () { return __awaiter(void 0, void 0, void 0, function () {
        var findForm, findEmailInput, findPasswordInput, getAuthStore, findAuthError, mockRouter, auth, mockLogin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    findForm = mountedLoginForm.findForm, findEmailInput = mountedLoginForm.findEmailInput, findPasswordInput = mountedLoginForm.findPasswordInput, getAuthStore = mountedLoginForm.getAuthStore, findAuthError = mountedLoginForm.findAuthError, mockRouter = mountedLoginForm.mockRouter;
                    vitest_1.vi.useFakeTimers();
                    return [4 /*yield*/, findEmailInput().setValue(validMockEmail)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, findPasswordInput().setValue(validMockPassword)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, vitest_1.vi.runAllTimersAsync()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 4:
                    _a.sent();
                    auth = getAuthStore();
                    mockLogin = vitest_1.vi.spyOn(auth, "login").mockRejectedValue(undefined);
                    return [4 /*yield*/, mockRouter.isReady()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, findForm().trigger("submit")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, flush_promises_1.default)()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 8:
                    _a.sent();
                    (0, vitest_1.expect)(mockLogin).toHaveBeenCalledWith(validMockEmail, validMockPassword);
                    (0, vitest_1.expect)(mockLogin).toHaveBeenCalledOnce();
                    (0, vitest_1.expect)(findAuthError().text()).not.toBe("");
                    (0, vitest_1.expect)(mockRouter.push).not.toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)("should reset the form", function () { return __awaiter(void 0, void 0, void 0, function () {
        var findEmailInput, findPasswordInput, findValidationErrors, findResetButton, emailInput, passwordInput, _a, emailError, passwordError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    findEmailInput = mountedLoginForm.findEmailInput, findPasswordInput = mountedLoginForm.findPasswordInput, findValidationErrors = mountedLoginForm.findValidationErrors, findResetButton = mountedLoginForm.findResetButton;
                    emailInput = findEmailInput();
                    passwordInput = findPasswordInput();
                    _a = findValidationErrors(), emailError = _a[0], passwordError = _a[1];
                    vitest_1.vi.useFakeTimers();
                    return [4 /*yield*/, emailInput.setValue("invalid")];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, passwordInput.setValue("invalid")];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, vitest_1.vi.runAllTimersAsync()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, findResetButton().trigger("click")];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, wrapper.vm.$nextTick()];
                case 6:
                    _b.sent();
                    (0, vitest_1.expect)(emailInput.element.value).toBe("");
                    (0, vitest_1.expect)(passwordInput.element.value).toBe("");
                    (0, vitest_1.expect)(emailError.text()).toBe("");
                    (0, vitest_1.expect)(passwordError.text()).toBe("");
                    return [2 /*return*/];
            }
        });
    }); });
});
