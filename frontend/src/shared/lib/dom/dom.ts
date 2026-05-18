export type Axis = "x" | "y";
export type Side = "top" | "right" | "bottom" | "left";
export type Dimension = "width" | "height";

export const computeSize = (el: HTMLElement, dimension: Dimension) => {
    return el.getBoundingClientRect()[dimension];
};

export const computeMinSize = (el: HTMLElement, dimension: Dimension) => {
    const oldSize = el.style[dimension];
    el.style[dimension] = "min-content";

    const result = el.getBoundingClientRect()[dimension];

    if (oldSize === "") el.style.removeProperty(dimension);
    else el.style[dimension] = oldSize;

    return result;
};

export const computeMaxSize = (el: HTMLElement, dimension: Dimension) => {
    const oldSize = el.style[dimension];
    el.style[dimension] = "10000px";

    const parentEl = el.parentElement;
    if (!parentEl) return NaN;

    const result = parentEl.getBoundingClientRect()[dimension];

    if (oldSize === "") el.style.removeProperty(dimension);
    else el.style[dimension] = oldSize;

    return result;
};

export const isMovingLeftPastElement = (oldX: number, newX: number, elX: number) => newX - oldX < 0 && newX < elX;
export const isMovingRightPastElement = (oldX: number, newX: number, elX: number) => newX - oldX > 0 && newX > elX;
export const isMovingUpPastElement = (oldY: number, newY: number, elY: number) => newY - oldY < 0 && newY < elY;
export const isMovingDownPastElement = (oldY: number, newY: number, elY: number) => newY - oldY > 0 && newY > elY;

export const isMovingPastElement = (oldCoord: number, newCoord: number, el: HTMLElement, dimension: Dimension) => {
    const elBoundingClientRect = el.getBoundingClientRect();
    if (dimension === "width") {
        if (!(isMovingLeftPastElement(oldCoord, newCoord, elBoundingClientRect.left) ||
            isMovingRightPastElement(oldCoord, newCoord, elBoundingClientRect.right))) return false;
    } else {
        if (!(isMovingUpPastElement(oldCoord, newCoord, elBoundingClientRect.top) ||
            isMovingDownPastElement(oldCoord, newCoord, elBoundingClientRect.bottom))) return false;
    }
    return true;
};