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
var vue_1 = require("vue");
var vitest_1 = require("vitest");
var useFormField_ts_1 = require("@/composables/useFormField.ts");
var rules_ts_1 = require("@/utils/rules.ts");
(0, vitest_1.describe)("useFormField", function () {
    (0, vitest_1.afterEach)(function () {
        vitest_1.vi.useRealTimers();
    });
    (0, vitest_1.it)("should initialize the field with the default value when the initial value is a primitive", function () {
        var value = (0, useFormField_ts_1.useFormField)("", []).value;
        (0, vitest_1.expect)(value.value).toBe("");
    });
    (0, vitest_1.it)("should initialize the field with the default value when the initial value is a reference", function () {
        var value = (0, useFormField_ts_1.useFormField)((0, vue_1.ref)(""), []).value;
        (0, vitest_1.expect)(value.value).toBe("");
    });
    (0, vitest_1.it)("should validate the field immediately upon initialization, producing a validation error", function () {
        var error = (0, useFormField_ts_1.useFormField)("", [
            rules_ts_1.rules.required("Required")
        ]).error;
        (0, vitest_1.expect)(error.value).toBe("Required");
    });
    (0, vitest_1.it)("should immediately validate the field without producing errors", function () {
        var _a = (0, useFormField_ts_1.useFormField)("Short string", [
            rules_ts_1.rules.minLength(13, "Too short")
        ]), value = _a.value, error = _a.error, validateNow = _a.validateNow;
        (0, vitest_1.expect)(error.value).toBe("Too short");
        value.value = "Longer string";
        var isValid = validateNow();
        (0, vitest_1.expect)(isValid).toBe(true);
        (0, vitest_1.expect)(error.value).toBeNull();
    });
    (0, vitest_1.it)("should validate the field with the default delay of 300ms without producing errors", function () {
        var _a = (0, useFormField_ts_1.useFormField)("", [
            rules_ts_1.rules.required("Required")
        ]), value = _a.value, error = _a.error, validateDebounced = _a.validateDebounced;
        vitest_1.vi.useFakeTimers();
        value.value = "Filled";
        validateDebounced();
        vitest_1.vi.advanceTimersByTime(299);
        (0, vitest_1.expect)(error.value).toBe("Required");
        vitest_1.vi.advanceTimersByTime(1);
        (0, vitest_1.expect)(error.value).toBeNull();
    });
    (0, vitest_1.it)("should validate the field with the delay of 1000ms without producing errors", function () {
        var _a = (0, useFormField_ts_1.useFormField)("", [
            rules_ts_1.rules.required("Required")
        ], {
            debounceDelay: 1000
        }), value = _a.value, error = _a.error, validateDebounced = _a.validateDebounced;
        vitest_1.vi.useFakeTimers();
        value.value = "Filled";
        validateDebounced();
        vitest_1.vi.advanceTimersByTime(999);
        (0, vitest_1.expect)(error.value).toBe("Required");
        vitest_1.vi.advanceTimersByTime(1);
        (0, vitest_1.expect)(error.value).toBeNull();
    });
    (0, vitest_1.it)("should schedule the field to validate and then cancel the validation without producing errors", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, value, error, validateDebounced;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = (0, useFormField_ts_1.useFormField)("Short string", [
                        rules_ts_1.rules.minLength(13, "Too Short"),
                    ]), value = _a.value, error = _a.error, validateDebounced = _a.validateDebounced;
                    value.value = "Longer string";
                    vitest_1.vi.useFakeTimers();
                    validateDebounced();
                    validateDebounced.cancel();
                    return [4 /*yield*/, vitest_1.vi.runAllTimersAsync()];
                case 1:
                    _b.sent();
                    (0, vitest_1.expect)(error.value).toBe("Too Short");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.it)("should have the field untouched by default", function () {
        var touched = (0, useFormField_ts_1.useFormField)("", []).touched;
        (0, vitest_1.expect)(touched.value).toBe(false);
    });
    (0, vitest_1.it)("should mark the field as touched", function () {
        var _a = (0, useFormField_ts_1.useFormField)("", []), touched = _a.touched, touch = _a.touch;
        touch();
        (0, vitest_1.expect)(touched.value).toBe(true);
    });
    (0, vitest_1.it)("should reset the field to the default value when the initial value is a primitive", function () {
        var initialValue = "Hello World";
        var _a = (0, useFormField_ts_1.useFormField)(initialValue, []), value = _a.value, reset = _a.reset;
        (0, vitest_1.expect)(value.value).toBe(initialValue);
        value.value = "Hello TypeScript";
        (0, vitest_1.expect)(value.value).toBe("Hello TypeScript");
        reset();
        (0, vitest_1.expect)(value.value).toBe(initialValue);
    });
    (0, vitest_1.it)("should reset the field to the default value when the initial value is a ref", function () {
        var initialValue = (0, vue_1.ref)("Hello World");
        var _a = (0, useFormField_ts_1.useFormField)(initialValue, []), value = _a.value, reset = _a.reset;
        (0, vitest_1.expect)(value.value).toBe(initialValue.value);
        value.value = "Hello TypeScript";
        (0, vitest_1.expect)(value.value).toBe("Hello TypeScript");
        reset();
        (0, vitest_1.expect)(value.value).toBe(initialValue.value);
    });
});
