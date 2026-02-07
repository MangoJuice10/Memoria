import type {Locator} from "@playwright/test";

export {};

declare global {
    namespace PlaywrightTest {
        interface Matchers<R> {
            toScaleInWidth(container: Locator, containerWidth: number, precision?: number);
            toScaleInHeight(container: Locator, containerHeight: number, precision?: number);
            toHaveHorizontalGapWith(container: Locator, expectedGapRatio: number, precision?: number);
            toHaveVerticalGapWith(container: Locator, expectedGapRatio: number, precision?: number);
            toMaintainHorizontalGapWith(secondElement: Locator, container: Locator, newContainerWidth: number, precision?: number);
            toMaintainVerticalGapWith(secondElement: Locator, container: Locator, newContainerHeight: number, precision?: number);
        }
    }
}