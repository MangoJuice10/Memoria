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
var test_1 = require("@playwright/test");
var getNonNullableBoundingBoxes_ts_1 = require("@tests/e2e/helpers/getNonNullableBoundingBoxes.ts");
var elementSizing_ts_1 = require("@tests/e2e/utils/elementSizing.ts");
var outputHandling_ts_1 = require("@tests/e2e/utils/outputHandling.ts");
var logo, logomark, logotype;
test_1.test.describe("Logo component test.vue", function () {
    test_1.test.beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, outputHandling_ts_1.cleanScreenshots)();
            return [2 /*return*/];
        });
    }); });
    test_1.test.beforeEach(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var page = _b.page;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, page.goto("/test/logo")];
                case 1:
                    _c.sent();
                    logo = page.getByTestId("logo");
                    logomark = page.getByTestId("logomark");
                    logotype = page.getByTestId("logotype");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("logomark doesn't overflow the logo vertically", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, logoBox, logomarkBox;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, getNonNullableBoundingBoxes_ts_1.getNonNullableBoundingBoxes)(logo, logomark)];
                case 1:
                    _a = _b.sent(), logoBox = _a[0], logomarkBox = _a[1];
                    (0, test_1.expect)(logomarkBox.height).toBeLessThanOrEqual(logoBox.height);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("logotype doesn't overflow the logo vertically", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, logoBox, logotypeBox;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, getNonNullableBoundingBoxes_ts_1.getNonNullableBoundingBoxes)(logo, logotype)];
                case 1:
                    _a = _b.sent(), logoBox = _a[0], logotypeBox = _a[1];
                    (0, test_1.expect)(logotypeBox.height).toBeLessThanOrEqual(logoBox.height);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("gap takes 5% of the logo", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, test_1.expect)(logomark).toHaveHorizontalGapWith(logotype, 0.05)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("gap shrinks proportionally with the logo horizontally", function () { return __awaiter(void 0, void 0, void 0, function () {
        var logoBB, logoWidth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, getNonNullableBoundingBoxes_ts_1.getNonNullableBoundingBoxes)(logo)];
                case 1:
                    logoBB = (_a.sent())[0];
                    logoWidth = [logoBB.width][0];
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logo, logoWidth * 0.9)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logo, logoWidth * 0.7)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logo, logoWidth * 0.5)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logo, logoWidth * 0.3)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logo, logoWidth * 0.1)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
test_1.test.describe("Logo component in a container test.vue", function () {
    var logoContainer, logoContainerWidth, logoContainerHeight;
    test_1.test.beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, outputHandling_ts_1.cleanScreenshots)();
            return [2 /*return*/];
        });
    }); });
    test_1.test.beforeEach(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var logoContainerBB;
        var _c;
        var page = _b.page;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, page.goto("/test/logo/container")];
                case 1:
                    _d.sent();
                    logo = page.getByTestId("logo");
                    logomark = page.getByTestId("logomark");
                    logotype = page.getByTestId("logotype");
                    logoContainer = page.getByTestId("logo-container");
                    return [4 /*yield*/, (0, getNonNullableBoundingBoxes_ts_1.getNonNullableBoundingBoxes)(logoContainer)];
                case 2:
                    logoContainerBB = (_d.sent())[0];
                    _c = [logoContainerBB.width, logoContainerBB.height], logoContainerWidth = _c[0], logoContainerHeight = _c[1];
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("logomark and logotype don't overflow the logo horizontally", function () { return __awaiter(void 0, void 0, void 0, function () {
        var logoBox, logoBoxContentWidth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, getNonNullableBoundingBoxes_ts_1.getNonNullableBoundingBoxes)(logo)];
                case 1:
                    logoBox = (_a.sent())[0];
                    return [4 /*yield*/, (0, elementSizing_ts_1.calcSummaryWidth)(logomark, logotype)];
                case 2:
                    logoBoxContentWidth = _a.sent();
                    (0, test_1.expect)(logoBoxContentWidth).toBeLessThanOrEqual(logoBox.width);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("logo doesn't overflow the container vertically", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, logoBox, logoContainerBox;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, getNonNullableBoundingBoxes_ts_1.getNonNullableBoundingBoxes)(logo, logoContainer)];
                case 1:
                    _a = _b.sent(), logoBox = _a[0], logoContainerBox = _a[1];
                    (0, test_1.expect)(logoBox.height).toBeLessThanOrEqual(logoContainerBox.height);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("logo doesn't overflow the container horizontally", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, logoBox, logoContainerBox;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, getNonNullableBoundingBoxes_ts_1.getNonNullableBoundingBoxes)(logo, logoContainer)];
                case 1:
                    _a = _b.sent(), logoBox = _a[0], logoContainerBox = _a[1];
                    (0, test_1.expect)(logoBox.width).toBeLessThanOrEqual(logoContainerBox.width);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("logo shrinks with the container horizontally", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.9, 0)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.7, 0)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.5, 0)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.3, 0)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.1, 0)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("logo shrinks with the container vertically", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.9, 0)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.7, 0)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.5, 0)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.3, 0)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.1, 0)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("logo doesn't grow with the container horizontally", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, test_1.expect)(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 1.5)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 4)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 5)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("logo grows with the container vertically", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInHeight(logoContainer, logoContainerHeight * 1.5, 1)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInHeight(logoContainer, logoContainerHeight * 2, 1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInHeight(logoContainer, logoContainerHeight * 3, 1)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInHeight(logoContainer, logoContainerHeight * 4, 1)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logo).toScaleInHeight(logoContainer, logoContainerHeight * 5, 1)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("gap shrinks proportionally with the container horizontally", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 0.9)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 0.7)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 0.5)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 0.3)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 0.1)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, test_1.test)("gap grows proportionally with the container horizontally", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 1.5)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 2)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 3)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 4)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, test_1.expect)(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 5)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
