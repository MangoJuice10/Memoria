import type {Locator} from "@playwright/test";

export {};

declare global {
    namespace PlaywrightTest {
        interface Matchers<R> {
            toScaleInWidth(container: Locator, containerWidth: number, precision?: number);
            toScaleInHeight(container: Locator, containerHeight: number, precision?: number);
        }
    }
}