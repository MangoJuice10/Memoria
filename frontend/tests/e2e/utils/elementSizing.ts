import type {Locator} from "@playwright/test";
import {getNonNullableBoundingBoxes} from "@tests/e2e/helpers/getNonNullableBoundingBoxes";
import type {BoundingBox} from "@tests/e2e/types/BoundingBox";

type Dimension = "width" | "height";

export async function calcElementSummaryWidth(...els: readonly [Locator, Locator, ...Locator[]]) {
    const [firstElBB, lastElBB] = await getNonNullableBoundingBoxes(...els);
    if (lastElBB.x < firstElBB.x) throw new Error("Elements are in the wrong order");
    return (lastElBB.x + lastElBB.width) - firstElBB.x;
}

export async function calcElementSummaryHeight(...els: readonly [Locator, Locator, ...Locator[]]) {
    const [firstElBB, lastElBB] = await getNonNullableBoundingBoxes(...els);
    if (lastElBB.y < firstElBB.y) throw new Error("Elements are in the wrong order");
    return (lastElBB.y + lastElBB.height) - firstElBB.y;
}

export async function calcElementContainerRatio(el: Locator, container: Locator, dimension: Dimension) {
    const [elBB, containerBB] = await getNonNullableBoundingBoxes(el, container);
    return elBB[dimension] / containerBB[dimension];
}

export async function calcElementContainerRatioDelta(el: Locator, container: Locator, dimension: Dimension, containerSize: number) {
    let
        elBB: NonNullable<BoundingBox>,
        containerBB: NonNullable<BoundingBox>;
    let
        baseRatio: number,
        newRatio: number;
    [elBB, containerBB] = await getNonNullableBoundingBoxes(el, container);
    baseRatio = elBB[dimension] / containerBB[dimension];
    if (dimension === "width") await resizeWidth(container, containerSize);
    else await resizeHeight(container, containerSize);
    [elBB, containerBB] = await getNonNullableBoundingBoxes(el, container);
    newRatio = elBB[dimension] / containerBB[dimension];
    return Math.abs(newRatio - baseRatio);
}

export async function resizeWidth(el: Locator, size: number) {
    await el.evaluate((el: HTMLElement, {size}) => {
        el.style.width = `${size}px`;
    }, {size});
}

export async function resizeHeight(el: Locator, size: number) {
    await el.evaluate((el: HTMLElement, {size}) => {
        el.style.height = `${size}px`;
    }, {size});
}