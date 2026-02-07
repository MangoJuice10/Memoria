import type {Locator} from "@playwright/test";
import {getNonNullableBoundingBoxes} from "@tests/e2e/helpers/getNonNullableBoundingBoxes";
import type {BoundingBox} from "@tests/e2e/types/BoundingBox";
import type {Axis, Dimension} from "@tests/e2e/types/geometry";

const axisToDimension: Record<Axis, Dimension> = {
    x: "width",
    y: "height",
};

export async function calcSummaryWidth(firstEl: Locator, secondEl: Locator) {
    const [firstElBB, lastElBB] = await getNonNullableBoundingBoxes(firstEl, secondEl);
    if (lastElBB.x < firstElBB.x) return (firstElBB.x + firstElBB.width) - lastElBB.x;
    return (lastElBB.x + lastElBB.width) - firstElBB.x;
}

export async function calcSummaryHeight(firstEl: Locator, secondEl: Locator) {
    const [firstElBB, lastElBB] = await getNonNullableBoundingBoxes(firstEl, secondEl);
    if (lastElBB.y < firstElBB.y) return (firstElBB.y + firstElBB.height) - lastElBB.y;
    return (lastElBB.y + lastElBB.height) - firstElBB.y;
}

export async function calcElementContainerRatio(el: Locator, container: Locator, dimension: Dimension) {
    const [elBB, containerBB] = await getNonNullableBoundingBoxes(el, container);
    return elBB[dimension] / containerBB[dimension];
}

export async function calcElementContainerRatioDelta(el: Locator, container: Locator, dimension: Dimension, containerSize: number) {
    const baseRatio = await calcElementContainerRatio(el, container, dimension);
    if (dimension === "width") await resizeWidth(container, containerSize);
    else await resizeHeight(container, containerSize);
    let newRatio = await calcElementContainerRatio(el, container, dimension);
    return Math.abs(newRatio - baseRatio);
}

export async function calcGap(firstEl: Locator, secondEl: Locator, axis: keyof typeof axisToDimension) {
    let
        firstElBB: NonNullable<BoundingBox>,
        secondElBB: NonNullable<BoundingBox>;
    [firstElBB, secondElBB] = await getNonNullableBoundingBoxes(firstEl, secondEl);
    return secondElBB[axis] - (firstElBB[axis] + firstElBB[axisToDimension[axis]]);
}

export async function calcGapElementsRatio(firstEl: Locator, secondEl: Locator, axis: keyof typeof axisToDimension) {
    let gap = await calcGap(firstEl, secondEl, axis);
    let summaryElsSize: number;
    if (axis === "x") summaryElsSize = await calcSummaryWidth(firstEl, secondEl);
    else summaryElsSize = await calcSummaryHeight(firstEl, secondEl);
    return gap / summaryElsSize;
}

export async function calcGapElementsRatioDelta(firstEl: Locator, secondEl: Locator, container: Locator, axis: keyof typeof axisToDimension, newContainerSize: number) {
    const baseGapElementsRatio = await calcGapElementsRatio(firstEl, secondEl, axis);
    if (axis === "x") await resizeWidth(container, newContainerSize);
    else await resizeHeight(container, newContainerSize);
    const newGapElementsRatio = await calcGapElementsRatio(firstEl, secondEl, axis);
    return newGapElementsRatio - baseGapElementsRatio;
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