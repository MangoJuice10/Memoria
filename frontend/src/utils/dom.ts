import type {Dimension} from "@/types/dom";

export const computeSize = (el: HTMLElement, dimension: Dimension, useClone = false) => {
    let result: number;
    if (!useClone) {
        result = el.getBoundingClientRect()[dimension];
    } else {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";

        document.body.appendChild(clone);
        result = clone.getBoundingClientRect()[dimension];
        document.body.removeChild(clone);
    }
    return result;
};

export const computeMinSize = (el: HTMLElement, dimension: Dimension, value: "0" | "min-content" = "0", useClone = false) => {
    let result: number;
    if (!useClone) {
        const oldSize = el.style[dimension];
        el.style[dimension] = value;

        result = el.getBoundingClientRect()[dimension];

        if (oldSize === "") el.style.removeProperty(dimension);
        else el.style[dimension] = oldSize;
    } else {
        const clone = el.cloneNode(true) as HTMLElement;
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style[dimension] = value;

        document.body.appendChild(clone);
        result = el.getBoundingClientRect()[dimension];
        document.body.removeChild(clone);
    }
    return result;
};

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

export const breakpoints: {
    readonly [breakpoint: string]: MediaQueryList;
} = {
    "2xl": window.matchMedia("(min-width: 1536px)"),
    "xl": window.matchMedia("(min-width: 1280px)"),
    "lg": window.matchMedia("(min-width: 1024px)"),
    "md": window.matchMedia("(min-width: 768px"),
    "sm": window.matchMedia("(min-width: 640px"),
};