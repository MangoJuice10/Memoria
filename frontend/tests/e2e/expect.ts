import {expect, type Locator} from "@playwright/test";
import {calcElementContainerRatioDelta} from "@tests/e2e/utils/elementSizing";

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

expect.extend({
    toScaleInWidth,
    toScaleInHeight,
});