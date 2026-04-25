"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByTestId = getByTestId;
function getByTestId(wrapper, testId) {
    var el = wrapper.find("[data-testid=\"".concat(testId, "\"]"));
    if (!el.exists()) {
        throw new Error("No element found with data-testid=\"".concat(testId, "\""));
    }
    return el;
}
