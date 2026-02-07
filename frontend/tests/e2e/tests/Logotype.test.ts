import {test, expect, type Locator} from "@playwright/test";
import {getNonNullableBoundingBoxes} from "@tests/e2e/helpers/getNonNullableBoundingBoxes.ts";
import {calcSummaryWidth} from "@tests/e2e/utils/elementSizing.ts";
import {cleanScreenshots} from "@tests/e2e/utils/outputHandling.ts";

let logo: Locator,
    graphLogo: Locator,
    textLogo: Locator;

test.describe("Logotype component test", () => {
    test.beforeAll(async () => {
        cleanScreenshots();
    });

    test.beforeEach(async ({page}) => {
        await page.goto("/test/logotype");
        logo = page.getByTestId("logotype");
        graphLogo = page.getByTestId("graphical-logotype");
        textLogo = page.getByTestId("textual-logotype");
    });

    test("graphical logotype doesn't overflow the logotype vertically", async () => {
        const [logoBox, graphLogoBox] = await getNonNullableBoundingBoxes(logo, graphLogo);
        expect(graphLogoBox.height).toBeLessThanOrEqual(logoBox.height);
    });

    test("textual logotype doesn't overflow the logotype vertically", async () => {
        const [logoBox, textLogoBox] = await getNonNullableBoundingBoxes(logo, textLogo);
        expect(textLogoBox.height).toBeLessThanOrEqual(logoBox.height);
    });

    test("gap takes 5% of the logotype", async () => {
        await expect(graphLogo).toHaveHorizontalGapWith(textLogo, 0.05);
    });

    test("gap shrinks proportionally with the logotype horizontally", async () => {
        const [logoBB] = await getNonNullableBoundingBoxes(logo);
        const [logoWidth] = [logoBB.width]
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logo, logoWidth * 0.9);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logo, logoWidth * 0.7);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logo, logoWidth * 0.5);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logo, logoWidth * 0.3);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logo, logoWidth * 0.1);
    });
});

test.describe("Logotype component in a container test", () => {
    let
        logoContainer: Locator,
        logoContainerWidth: number,
        logoContainerHeight: number;

    test.beforeAll(async () => {
        cleanScreenshots();
    });

    test.beforeEach(async ({page}) => {
        await page.goto("/test/logotype/container");
        logo = page.getByTestId("logotype");
        graphLogo = page.getByTestId("graphical-logotype");
        textLogo = page.getByTestId("textual-logotype");
        logoContainer = page.getByTestId("logotype-container");
        const [logoContainerBB] = await getNonNullableBoundingBoxes(logoContainer);
        [logoContainerWidth, logoContainerHeight] = [logoContainerBB.width, logoContainerBB.height];
    });

    test("textual and graphical logotypes don't overflow the logotype horizontally", async () => {
        const [logoBox] = await getNonNullableBoundingBoxes(logo);
        const logoBoxContentWidth = await calcSummaryWidth(graphLogo, textLogo);
        expect(logoBoxContentWidth).toBeLessThanOrEqual(logoBox.width);
    });

    test("logotype doesn't overflow the container vertically", async () => {
        const [logoBox, logoContainerBox] = await getNonNullableBoundingBoxes(logo, logoContainer);
        expect(logoBox.height).toBeLessThanOrEqual(logoContainerBox.height);
    });

    test("logotype doesn't overflow the container horizontally", async () => {
        const [logoBox, logoContainerBox] = await getNonNullableBoundingBoxes(logo, logoContainer);
        expect(logoBox.width).toBeLessThanOrEqual(logoContainerBox.width);
    });

    test("logotype shrinks with the container horizontally", async () => {
        await expect(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.9, 0);
        await expect(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.7, 0);
        await expect(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.5, 0);
        await expect(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.3, 0);
        await expect(logo).toScaleInWidth(logoContainer, logoContainerWidth * 0.1, 0);
    });

    test("logotype shrinks with the container vertically", async () => {
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.9, 0);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.7, 0);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.5, 0);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.3, 0);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 0.1, 0);
    });

    test("logotype doesn't grow with the container horizontally", async () => {
        await expect(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 1.5);
        await expect(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 2);
        await expect(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 3);
        await expect(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 4);
        await expect(logo).not.toScaleInWidth(logoContainer, logoContainerWidth * 5);
    });

    test("logotype grows with the container vertically", async () => {
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 1.5, 1);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 2, 1);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 3, 1);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 4, 1);
        await expect(logo).toScaleInHeight(logoContainer, logoContainerHeight * 5, 1);
    });

    test("gap shrinks proportionally with the container horizontally", async () => {
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logoContainer, logoContainerWidth * 0.9);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logoContainer, logoContainerWidth * 0.7);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logoContainer, logoContainerWidth * 0.5);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logoContainer, logoContainerWidth * 0.3);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logoContainer, logoContainerWidth * 0.1);
    });

    test("gap grows proportionally with the container horizontally", async () => {
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logoContainer, logoContainerWidth * 1.5);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logoContainer, logoContainerWidth * 2);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logoContainer, logoContainerWidth * 3);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logoContainer, logoContainerWidth * 4);
        await expect(graphLogo).toMaintainHorizontalGapWith(textLogo, logoContainer, logoContainerWidth * 5);
    });
});