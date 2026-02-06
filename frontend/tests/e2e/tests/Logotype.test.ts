import {test, expect, type Locator} from "@playwright/test";
import {getNonNullableBoundingBoxes} from "@tests/e2e/helpers/getNonNullableBoundingBoxes.ts";
import {calcElementSummaryWidth, resizeHeight, resizeWidth} from "@tests/e2e/utils/elementSizing.ts";
import {screenshotsHandling} from "@tests/e2e/utils/screenshotsHandling.ts";

let logo: Locator,
    graphLogo: Locator,
    textLogo: Locator,
    logoContainer: Locator;
const LOGO_CONTAINER_BASE_HEIGHT = 100;
const LOGO_CONTAINER_BASE_WIDTH = 100;
const gapLogoRatio = 0.05;

async function expectGapToScale(
    newContainerWidth = LOGO_CONTAINER_BASE_WIDTH,
    newContainerHeight = LOGO_CONTAINER_BASE_HEIGHT,
    precision = 1,
) {
    await Promise.all([
        resizeWidth(logoContainer, newContainerWidth),
        resizeHeight(logoContainer, newContainerHeight)
    ]);
    const [graphLogoBox, textLogoBox] = await getNonNullableBoundingBoxes(graphLogo, textLogo);
    const logoBoxContentWidth = await calcElementSummaryWidth(graphLogo, textLogo);
    const gapPx = textLogoBox.x - (graphLogoBox.x + graphLogoBox.width);
    const expectedGapPx = logoBoxContentWidth * gapLogoRatio;
    expect(gapPx).toBeCloseTo(expectedGapPx, precision);
}

test.describe("Logotype", () => {
    test.beforeAll(async () => {
        screenshotsHandling();
    });

    test.beforeEach(async ({page}) => {
        await page.goto("/test/logotype");
        logo = page.getByTestId("logotype");
        graphLogo = page.getByTestId("graphical-logotype");
        textLogo = page.getByTestId("textual-logotype");
        logoContainer = page.getByTestId("logotype-container");

        await logoContainer.evaluate((el: HTMLElement, {width, height}) => {
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
        }, {width: LOGO_CONTAINER_BASE_WIDTH, height: LOGO_CONTAINER_BASE_HEIGHT});
    });

    test("graphical logotype doesn't overflow the logotype vertically", async () => {
        const [logoBox, graphLogoBox] = await getNonNullableBoundingBoxes(logo, graphLogo);
        expect(graphLogoBox.height).toBeLessThanOrEqual(logoBox.height);
    });

    test("textual logotype doesn't overflow the logotype vertically", async () => {
        const [logoBox, textLogoBox] = await getNonNullableBoundingBoxes(logo, textLogo);
        expect(textLogoBox.height).toBeLessThanOrEqual(logoBox.height);
    });

    test("textual and graphical logotypes don't overflow the logotype horizontally", async () => {
        const [logoBox] = await getNonNullableBoundingBoxes(logo);
        const logoBoxContentWidth = await calcElementSummaryWidth(graphLogo, textLogo);
        expect(logoBoxContentWidth).toBeLessThanOrEqual(logoBox.width);
    });

    test("logotype doesn't overflow the container vertically", async () => {
        const [logoBox] = await getNonNullableBoundingBoxes(logo);
        expect(logoBox.height).toBeLessThanOrEqual(LOGO_CONTAINER_BASE_HEIGHT);
    });

    test("logotype doesn't overflow the container horizontally", async () => {
        const [logoBox, logoContainerBox] = await getNonNullableBoundingBoxes(logo, logoContainer);
        expect(logoBox.width).toBeLessThanOrEqual(logoContainerBox.width);
    });

    test("logotype shrinks with the container vertically", async () => {
        await expect(logo).toScaleInHeight(logoContainer, 70, 0);
        await expect(logo).toScaleInHeight(logoContainer, 50, 0);
        await expect(logo).toScaleInHeight(logoContainer, 30, 0);
        await expect(logo).toScaleInHeight(logoContainer, 10, 0);
    });

    test("logotype shrinks with the container horizontally", async () => {
        await expect(logo).toScaleInWidth(logoContainer, 70, 0);
        await expect(logo).toScaleInWidth(logoContainer, 50, 0);
        await expect(logo).toScaleInWidth(logoContainer, 30, 0);
        await expect(logo).toScaleInWidth(logoContainer, 10, 0);
    });

    test("logotype grows with the container vertically", async () => {
        await expect(logo).toScaleInHeight(logoContainer, 200, 1);
        await expect(logo).toScaleInHeight(logoContainer, 300, 1);
        await expect(logo).toScaleInHeight(logoContainer, 400, 1);
        await expect(logo).toScaleInHeight(logoContainer, 500, 1);
    });

    test("logotype doesn't grow with the container horizontally", async() => {
        await expect(logo).not.toScaleInWidth(logoContainer, 200);
        await expect(logo).not.toScaleInWidth(logoContainer, 300);
        await expect(logo).not.toScaleInWidth(logoContainer, 400);
        await expect(logo).not.toScaleInWidth(logoContainer, 500);
    })

    test("gap takes 5% of the logotype", async () => {
        await expectGapToScale();
    });

    test("gap shrinks proportionally with the container's size", async () => {
        await expectGapToScale(LOGO_CONTAINER_BASE_WIDTH, 70);
        await expectGapToScale(LOGO_CONTAINER_BASE_WIDTH, 50);
        await expectGapToScale(LOGO_CONTAINER_BASE_WIDTH, 30);
        await expectGapToScale(LOGO_CONTAINER_BASE_WIDTH, 10);
        await expectGapToScale(70);
        await expectGapToScale(50);
        await expectGapToScale(30);
        await expectGapToScale(10);
    });

    test("gap grows proportionally with the container's size", async () => {
        await expectGapToScale(LOGO_CONTAINER_BASE_WIDTH, 200);
        await expectGapToScale(LOGO_CONTAINER_BASE_WIDTH, 300);
        await expectGapToScale(LOGO_CONTAINER_BASE_WIDTH, 400);
        await expectGapToScale(LOGO_CONTAINER_BASE_WIDTH, 500);
        await expectGapToScale(200);
        await expectGapToScale(300);
        await expectGapToScale(400);
        await expectGapToScale(500);
    });
});