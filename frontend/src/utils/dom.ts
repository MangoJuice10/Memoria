import type {Dimension} from "@/types/dom";

export const computeMinSize = (el: HTMLElement, dimension: Dimension) => {
    const originalSize = el.style[dimension];
    el.style[dimension] = "min-content";
    const result = el.getBoundingClientRect()[dimension];
    if (originalSize !== "") el.style[dimension] = originalSize;
    else el.style.removeProperty(dimension);
    return result;
}

export const isMovingLeftPastElement = (curOldX: number, curNewX: number, elX: number) => curNewX - curOldX < 0 && curNewX < elX;
export const isMovingRightPastElement = (curOldX: number, curNewX: number, elX: number) => curNewX - curOldX > 0 && curNewX > elX;
export const isMovingUpPastElement = (curOldY: number, curNewY: number, elY: number) => curNewY - curOldY < 0 && curNewY < elY;
export const isMovingDownPastElement = (curOldY: number, curNewY: number, elY: number) => curNewY - curOldY > 0 && curNewY > elY;
