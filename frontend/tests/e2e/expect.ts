import {expect, type Locator} from "@playwright/test";
import {
    calcElementContainerRatioDelta,
    calcGapElementsRatio,
    calcGapElementsRatioDelta
} from "@tests/e2e/utils/elementSizing";

export async function toScaleInWidth(el: Locator, container: Locator, newContainerWidth: number, precision = 2) {
    const ratioDelta = await calcElementContainerRatioDelta(el, container, "width", newContainerWidth);
    const epsilon = Math.pow(10, -precision) / 2;
    const pass = Math.abs(ratioDelta) < epsilon;
    return {
        pass,
        message: () =>
            pass ? `Expected the ratio delta to be 0±${epsilon}` :
                `Expected the ratio delta to be 0±${epsilon}, but got ${ratioDelta}`
    };
}

export async function toScaleInHeight(el: Locator, container: Locator, newContainerHeight: number, precision = 2) {
    const ratioDelta = await calcElementContainerRatioDelta(el, container, "height", newContainerHeight);
    const epsilon = Math.pow(10, -precision) / 2;
    const pass = Math.abs(ratioDelta) < epsilon;
    return {
        pass,
        message: () =>
            pass ? `Expected the ratio delta to be 0±${epsilon}` :
                `Expected the ratio delta to be 0±${epsilon}, but got ${ratioDelta}`
    };
}

export async function toHaveHorizontalGapWith(firstEl: Locator, secondEl: Locator, expectedGapRatio: number, precision = 2) {
    const gapRatio = await calcGapElementsRatio(firstEl, secondEl, "x");
    const epsilon = Math.pow(10, -precision) / 2;
    const pass = Math.abs(gapRatio - expectedGapRatio) < epsilon;
    return {
        pass,
        message: () =>
            pass ? `Expected the horizontal gap ratio to be ${expectedGapRatio}` :
                `Expected the horizontal gap ratio to be ${expectedGapRatio}, but got ${gapRatio}`
    };
}

export async function toHaveVerticalGapWith(firstEl: Locator, secondEl: Locator, expectedGapRatio: number, precision = 2) {
    const gapRatio = await calcGapElementsRatio(firstEl, secondEl, "y");
    const epsilon = Math.pow(10, -precision) / 2;
    const pass = Math.abs(gapRatio - expectedGapRatio) < epsilon;
    return {
        pass,
        message: () =>
            pass ? `Expected the vertical gap ratio to be ${expectedGapRatio}` :
                `Expected the vertical gap ratio to be ${expectedGapRatio}, but got ${gapRatio}`
    };
}

export async function toMaintainHorizontalGapWith(firstEl: Locator, secondEl: Locator, container: Locator, newContainerWidth: number, precision = 2) {
    const gapElementsDelta = await calcGapElementsRatioDelta(firstEl, secondEl, container, "x", newContainerWidth);
    const epsilon = Math.pow(10, -precision) / 2;
    const pass = Math.abs(gapElementsDelta) < epsilon;
    return {
        pass,
        message: () =>
            pass ? `Expected the horizontal gap to elements ratio delta to be 0±${epsilon}` :
                `Expected the horizontal gap to elements ratio delta to be 0±${epsilon}, but got ${gapElementsDelta}`
    };
}

export async function toMaintainVerticalGapWith(firstEl: Locator, secondEl: Locator, container: Locator, newContainerHeight: number, precision = 2) {
    const gapElementsDelta = await calcGapElementsRatioDelta(firstEl, secondEl, container, "y", newContainerHeight);
    const epsilon = Math.pow(10, -precision) / 2;
    const pass = Math.abs(gapElementsDelta) < epsilon;
    return {
        pass,
        message: () =>
            pass ? `Expected the vertical gap to elements ratio delta to be 0±${epsilon}` :
                `Expected the vertical gap to elements ratio delta to be 0±${epsilon}, but got ${gapElementsDelta}`
    };
}

expect.extend({
    toScaleInWidth,
    toScaleInHeight,
    toHaveHorizontalGapWith,
    toHaveVerticalGapWith,
    toMaintainHorizontalGapWith,
    toMaintainVerticalGapWith,
});