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
exports.toScaleInWidth = toScaleInWidth;
exports.toScaleInHeight = toScaleInHeight;
exports.toHaveHorizontalGapWith = toHaveHorizontalGapWith;
exports.toHaveVerticalGapWith = toHaveVerticalGapWith;
exports.toMaintainHorizontalGapWith = toMaintainHorizontalGapWith;
exports.toMaintainVerticalGapWith = toMaintainVerticalGapWith;
var test_1 = require("@playwright/test");
var elementSizing_1 = require("@tests/e2e/utils/elementSizing");
function toScaleInWidth(el_1, container_1, newContainerWidth_1) {
    return __awaiter(this, arguments, void 0, function (el, container, newContainerWidth, precision) {
        var ratioDelta, epsilon, pass;
        if (precision === void 0) { precision = 2; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elementSizing_1.calcElementContainerRatioDelta)(el, container, "width", newContainerWidth)];
                case 1:
                    ratioDelta = _a.sent();
                    epsilon = Math.pow(10, -precision) / 2;
                    pass = Math.abs(ratioDelta) < epsilon;
                    return [2 /*return*/, {
                            pass: pass,
                            message: function () {
                                return pass ? "Expected the ratio delta to be 0\u00B1".concat(epsilon) :
                                    "Expected the ratio delta to be 0\u00B1".concat(epsilon, ", but got ").concat(ratioDelta);
                            }
                        }];
            }
        });
    });
}
function toScaleInHeight(el_1, container_1, newContainerHeight_1) {
    return __awaiter(this, arguments, void 0, function (el, container, newContainerHeight, precision) {
        var ratioDelta, epsilon, pass;
        if (precision === void 0) { precision = 2; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elementSizing_1.calcElementContainerRatioDelta)(el, container, "height", newContainerHeight)];
                case 1:
                    ratioDelta = _a.sent();
                    epsilon = Math.pow(10, -precision) / 2;
                    pass = Math.abs(ratioDelta) < epsilon;
                    return [2 /*return*/, {
                            pass: pass,
                            message: function () {
                                return pass ? "Expected the ratio delta to be 0\u00B1".concat(epsilon) :
                                    "Expected the ratio delta to be 0\u00B1".concat(epsilon, ", but got ").concat(ratioDelta);
                            }
                        }];
            }
        });
    });
}
function toHaveHorizontalGapWith(firstEl_1, secondEl_1, expectedGapRatio_1) {
    return __awaiter(this, arguments, void 0, function (firstEl, secondEl, expectedGapRatio, precision) {
        var gapRatio, epsilon, pass;
        if (precision === void 0) { precision = 2; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elementSizing_1.calcGapElementsRatio)(firstEl, secondEl, "x")];
                case 1:
                    gapRatio = _a.sent();
                    epsilon = Math.pow(10, -precision) / 2;
                    pass = Math.abs(gapRatio - expectedGapRatio) < epsilon;
                    return [2 /*return*/, {
                            pass: pass,
                            message: function () {
                                return pass ? "Expected the horizontal gap ratio to be ".concat(expectedGapRatio) :
                                    "Expected the horizontal gap ratio to be ".concat(expectedGapRatio, ", but got ").concat(gapRatio);
                            }
                        }];
            }
        });
    });
}
function toHaveVerticalGapWith(firstEl_1, secondEl_1, expectedGapRatio_1) {
    return __awaiter(this, arguments, void 0, function (firstEl, secondEl, expectedGapRatio, precision) {
        var gapRatio, epsilon, pass;
        if (precision === void 0) { precision = 2; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elementSizing_1.calcGapElementsRatio)(firstEl, secondEl, "y")];
                case 1:
                    gapRatio = _a.sent();
                    epsilon = Math.pow(10, -precision) / 2;
                    pass = Math.abs(gapRatio - expectedGapRatio) < epsilon;
                    return [2 /*return*/, {
                            pass: pass,
                            message: function () {
                                return pass ? "Expected the vertical gap ratio to be ".concat(expectedGapRatio) :
                                    "Expected the vertical gap ratio to be ".concat(expectedGapRatio, ", but got ").concat(gapRatio);
                            }
                        }];
            }
        });
    });
}
function toMaintainHorizontalGapWith(firstEl_1, secondEl_1, container_1, newContainerWidth_1) {
    return __awaiter(this, arguments, void 0, function (firstEl, secondEl, container, newContainerWidth, precision) {
        var gapElementsDelta, epsilon, pass;
        if (precision === void 0) { precision = 2; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elementSizing_1.calcGapElementsRatioDelta)(firstEl, secondEl, container, "x", newContainerWidth)];
                case 1:
                    gapElementsDelta = _a.sent();
                    epsilon = Math.pow(10, -precision) / 2;
                    pass = Math.abs(gapElementsDelta) < epsilon;
                    return [2 /*return*/, {
                            pass: pass,
                            message: function () {
                                return pass ? "Expected the horizontal gap to elements ratio delta to be 0\u00B1".concat(epsilon) :
                                    "Expected the horizontal gap to elements ratio delta to be 0\u00B1".concat(epsilon, ", but got ").concat(gapElementsDelta);
                            }
                        }];
            }
        });
    });
}
function toMaintainVerticalGapWith(firstEl_1, secondEl_1, container_1, newContainerHeight_1) {
    return __awaiter(this, arguments, void 0, function (firstEl, secondEl, container, newContainerHeight, precision) {
        var gapElementsDelta, epsilon, pass;
        if (precision === void 0) { precision = 2; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, elementSizing_1.calcGapElementsRatioDelta)(firstEl, secondEl, container, "y", newContainerHeight)];
                case 1:
                    gapElementsDelta = _a.sent();
                    epsilon = Math.pow(10, -precision) / 2;
                    pass = Math.abs(gapElementsDelta) < epsilon;
                    return [2 /*return*/, {
                            pass: pass,
                            message: function () {
                                return pass ? "Expected the vertical gap to elements ratio delta to be 0\u00B1".concat(epsilon) :
                                    "Expected the vertical gap to elements ratio delta to be 0\u00B1".concat(epsilon, ", but got ").concat(gapElementsDelta);
                            }
                        }];
            }
        });
    });
}
test_1.expect.extend({
    toScaleInWidth: toScaleInWidth,
    toScaleInHeight: toScaleInHeight,
    toHaveHorizontalGapWith: toHaveHorizontalGapWith,
    toHaveVerticalGapWith: toHaveVerticalGapWith,
    toMaintainHorizontalGapWith: toMaintainHorizontalGapWith,
    toMaintainVerticalGapWith: toMaintainVerticalGapWith,
});
