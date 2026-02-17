import {test, expect, type Locator} from "@playwright/test";
import {getNonNullableBoundingBoxes} from "@tests/e2e/helpers/getNonNullableBoundingBoxes.ts";
import {calcSummaryWidth} from "@tests/e2e/utils/elementSizing.ts";
import {cleanScreenshots} from "@tests/e2e/utils/outputHandling.ts";

let logo: Locator,
    logomark: Locator,
    logotype: Locator;

test.describe("Logo component test", () => {
    test.beforeAll(async () => {
        cleanScreenshots();
    });

    test.beforeEach(async ({page}) => {
        await page.goto("/test/logo");
        logo = page.getByTestId("logo");
        logomark = page.getByTestId("logomark");
        logotype = page.getByTestId("logotype");
    });

    test("logomark doesn't overflow the logo vertically", async () => {
        const [logoBox, logomarkBox] = await getNonNullableBoundingBoxes(logo, logomark);
        expect(logomarkBox.height).toBeLessThanOrEqual(logoBox.height);
    });

    test("logotype doesn't overflow the logo vertically", async () => {
        const [logoBox, logotypeBox] = await getNonNullableBoundingBoxes(logo, logotype);
        expect(logotypeBox.height).toBeLessThanOrEqual(logoBox.height);
    });

    test("gap takes 5% of the logo", async () => {
        await expect(logomark).toHaveHorizontalGapWith(logotype, 0.05);
    });

    test("gap shrinks proportionally with the logo horizontally", async () => {
        const [logoBB] = await getNonNullableBoundingBoxes(logo);
        const [logoWidth] = [logoBB.width]
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logo, logoWidth * 0.9);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logo, logoWidth * 0.7);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logo, logoWidth * 0.5);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logo, logoWidth * 0.3);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logo, logoWidth * 0.1);
    });
});

test.describe("Logo component in a container test", () => {
    let
        logoContainer: Locator,
        logoContainerWidth: number,
        logoContainerHeight: number;

    test.beforeAll(async () => {
        cleanScreenshots();
    });

    test.beforeEach(async ({page}) => {
        await page.goto("/test/logo/container");
        logo = page.getByTestId("logo");
        logomark = page.getByTestId("logomark");
        logotype = page.getByTestId("logotype");
        logoContainer = page.getByTestId("logo-container");
        const [logoContainerBB] = await getNonNullableBoundingBoxes(logoContainer);
        [logoContainerWidth, logoContainerHeight] = [logoContainerBB.width, logoContainerBB.height];
    });

    test("logomark and logotype don't overflow the logo horizontally", async () => {
        const [logoBox] = await getNonNullableBoundingBoxes(logo);
        const logoBoxContentWidth = await calcSummaryWidth(logomark, logotype);
        expect(logoBoxContentWidth).toBeLessThanOrEqual(logoBox.width);
    });

    test("logo doesn't overflow the container vertically", async () => {
        const [logoBox, logoContainerBox] = await getNonNullableBoundingBoxes(logo, logoContainer);
        expect(logoBox.height).toBeLessThanOrEqual(logoContainerBox.height);
    });

    test("logo doesn't overflow the container horizontally", async () => {
        const [logoBox, logoContainerBox] = await getNonNullableBoundingBoxes(logo, logoContainer);
        expect(logoBox.width).toBeLessThanOrEqual(logoContainerBox.width);
    });

    test("logo shrinks with the container horizontally", async () => {
        await expect(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.9, 0);
        await expect(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.7, 0);
        await expect(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.5, 0);
        await expect(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.3, 0);
        await expect(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.1, 0);
    });

    test("logo shrinks with the container vertically", async () => {
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.9, 0);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.7, 0);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.5, 0);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.3, 0);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.1, 0);
    });

    test("logo doesn't grow with the container horizontally", async () => {
        await expect(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 1.5);
        await expect(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 2);
        await expect(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 3);
        await expect(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 4);
        await expect(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 5);
    });

    test("logo grows with the container vertically", async () => {
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 1.5, 1);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 2, 1);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 3, 1);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 4, 1);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 5, 1);
    });

    test("gap shrinks proportionally with the container horizontally", async () => {
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 0.9);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 0.7);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 0.5);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 0.3);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 0.1);
    });

    test("gap grows proportionally with the container horizontally", async () => {
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 1.5);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 2);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 3);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 4);
        await expect(logomark).toMaintainHorizontalGapWith(logotype, logoContainer, logoContainerWidth * 5);
    });
});