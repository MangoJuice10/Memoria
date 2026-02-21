import type {Dimension} from "@/types/dom";

export const computeSize = (el: HTMLElement, dimension: Dimension) => {
    return el.getBoundingClientRect()[dimension];
}

export const computeMinSize = (el: HTMLElement, dimension: Dimension) => {
    if (el instanceof HTMLImageElement) return 0;
    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.position = "absolute";
    clone.style.visibility = "hidden";
    clone.style[dimension] = "min-content";

    document.body.appendChild(clone);
    const result = computeSize(clone, dimension);
    document.body.removeChild(clone);

    return result;
}

export const isMovingLeftPastElement = (oldX: number, newX: number, elX: number) => newX - oldX < 0 && newX < elX;
export const isMovingRightPastElement = (oldX: number, newX: number, elX: number) => newX - oldX > 0 && newX > elX;
export const isMovingUpPastElement = (oldY: number, newY: number, elY: number) => newY - oldY < 0 && newY < elY;
export const isMovingDownPastElement = (oldY: number, newY: number, elY: number) => newY - oldY > 0 && newY > elY;

export const isMovingPastElement = (oldCoord: number, newCoord: number, el: HTMLElement, dimension: Dimension) => {
    const elBR = el.getBoundingClientRect();
    if (dimension === "width") {
        if (!(isMovingLeftPastElement(oldCoord, newCoord, elBR.left) ||
            isMovingRightPastElement(oldCoord, newCoord, elBR.right))) return false;
    } else {
        if (!(isMovingUpPastElement(oldCoord, newCoord, elBR.top) ||
            isMovingDownPastElement(oldCoord, newCoord, elBR.bottom))) return false;
    }
    return true;
};