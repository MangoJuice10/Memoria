import {useTemplateRef, onMounted, onBeforeUnmount} from "vue";
import {
    computeSize,
    computeMinSize,
    isMovingPastElement,
    breakpoints
} from "@/shared/lib/dom.ts";
import {debounce} from "@/shared/lib/debounce.ts";
import {capitalize} from "@/shared/lib/capitalize.ts";
import type {Axis, Side, Dimension} from "@/shared/lib/dom.ts";

export const useResizable = (options: {
    minWidth?: string;
    minHeight?: string;
}) => {
    const rzContainerRef = useTemplateRef<HTMLElement | null>("resizable-container");

    onMounted(() => {
        if (!rzContainerRef.value) throw new Error("Resizable container didn't render");
        if (!(rzContainerRef.value instanceof HTMLElement)) throw new Error("Resizable container must be an HTML Element");
        rzContainer = rzContainerRef.value;

        if (!rzContainer.firstElementChild) throw new Error("Resizable container is empty");
        if (!(rzContainer.firstElementChild instanceof HTMLElement)) throw new Error("Resizable element must be an HTML Element");
        rzEl = rzContainer.firstElementChild;

        const resizeObserver = new ResizeObserver(entries => {
            if (!entries[0]) throw new Error("Resizable container didn't render");
            const {width, height} = entries[0].contentRect;
            if (width > 0 && height > 0) {
                setRzContainerMinDimensions();
                setRzContainerBaseDimensions();

                resizeObserver.disconnect();
            }
        });
        resizeObserver.observe(rzContainer);

        for (const media of Object.values(breakpoints)) {
            media.addEventListener("change", handleBreakpointChange);
        }
    });

    onBeforeUnmount(() => {
        for (const media of Object.values(breakpoints)) {
            media.removeEventListener("change", handleBreakpointChange);
        }
    });

    const sideToDimension: Record<Side, Dimension> = {
        "top": "height",
        "right": "width",
        "bottom": "height",
        "left": "width",
    };

    const dimensionToAxis: Record<Dimension, Axis> = {
        "width": "x",
        "height": "y",
    };

    const oppositeDimension: Record<Dimension, Dimension> = {
        "width": "height",
        "height": "width"
    };

    let rzContainer: HTMLElement,
        rzEl: HTMLElement;

    const rzContainerMeta = {
        width: {
            base: NaN,
            min: NaN,
        },
        height: {
            base: NaN,
            min: NaN,
        }
    };

    const oldCursorPos = {
        x: 0,
        y: 0,
    };

    const cloneRzContainer = () => {
        const rzContainerClone = rzContainer.cloneNode(true) as HTMLElement;
        rzContainerClone.style.position = "absolute";
        rzContainerClone.style.visibility = "hidden";

        if (!rzContainerClone.firstElementChild) throw new Error("Resizable container clone is empty");
        const rzElClone = rzContainerClone.firstElementChild as HTMLElement;
        rzElClone.style.removeProperty("display");
        return rzContainerClone;
    };

    const computeRzContainerBaseSize = (dimension: Dimension) => {
        const rzContainerClone = cloneRzContainer();
        document.body.appendChild(rzContainerClone);
        const result = computeSize(rzContainerClone, dimension);
        document.body.removeChild(rzContainerClone);
        return result;
    };

    const computeRzContainerMinSize = (dimension: Dimension) => {
        if (rzEl instanceof HTMLImageElement) return 0;
        const rzContainerClone = cloneRzContainer();
        document.body.appendChild(rzContainerClone);
        const result = computeMinSize(rzContainerClone, dimension, "min-content");
        document.body.removeChild(rzContainerClone);
        return result;
    };

    const setRzContainerMinDimensions = () => {
        if (options.minWidth) {
            rzContainer.style.minWidth = options.minWidth;
            rzContainerMeta.width.min = computeMinSize(rzContainer, "width");
        } else {
            rzContainerMeta.width.min = computeRzContainerMinSize("width");
        }

        if (options.minHeight) {
            rzContainer.style.minHeight = options.minHeight;
            rzContainerMeta.height.min = computeMinSize(rzContainer, "height");
        } else {
            rzContainerMeta.height.min = computeRzContainerMinSize("height");
        }
    };

    const setRzContainerBaseDimensions = () => {
        rzContainerMeta.width.base = Math.max(rzContainerMeta.width.min, computeRzContainerBaseSize("width"));
        rzContainerMeta.height.base = Math.max(rzContainerMeta.height.min, computeRzContainerBaseSize("height"));
        rzContainer.style.width = `${rzContainerMeta.width.base}px`;
        rzContainer.style.height = `${rzContainerMeta.height.base}px`;
    };

    const handleBreakpointChange = () => {
        setRzContainerMinDimensions();
        setRzContainerBaseDimensions();
    };

    const startResize = (startResizeEvent: MouseEvent, side: Side) => {
        const rzHandle = startResizeEvent.currentTarget;
        if (!rzHandle) throw new Error("Resize handle didn't render");
        if (!(rzHandle instanceof HTMLElement)) throw new Error("Resize handle must be an HTML Element");

        [oldCursorPos.x, oldCursorPos.y] = [startResizeEvent.clientX, startResizeEvent.clientY];
        resizeListener = (resizeEvent: MouseEvent) => {
            debouncedResize(resizeEvent, rzHandle, side);
        };

        document.documentElement.style.cursor = sideToDimension[side] === "width" ? "var(--cursor-ew-resize)" : "var(--cursor-ns-resize)";
        document.documentElement.style.pointerEvents = "none";
        document.documentElement.style.userSelect = "none";

        window.addEventListener("mousemove", resizeListener);
        window.addEventListener("mouseup", stopResize);
    };

    const adjustRzContainerSize = (dimension: Dimension) => {
        const computedMinSize = computeRzContainerMinSize(dimension);
        if (!options[`min${capitalize(dimension)}`]) rzContainerMeta[dimension]["min"] = computedMinSize;
        if (computedMinSize > rzContainer.getBoundingClientRect()[dimension]) rzContainer.style[dimension] = `${Math.max(computedMinSize, rzContainerMeta[dimension]["min"])}px`;
    };

    const resize = (e: MouseEvent, rzHandle: HTMLElement, side: Side) => {
        const dimension = sideToDimension[side];
        const axis = dimensionToAxis[dimension];

        const oldCoord = oldCursorPos[axis];
        const newCoord = e[`client${capitalize(dimensionToAxis[dimension])}`];

        if (!isMovingPastElement(oldCoord, newCoord, rzHandle, dimension)) {
            oldCursorPos[axis] = newCoord;
            return;
        }

        const delta = newCoord - oldCoord;
        const direction = side === "right" || side === "bottom" ? 1 : -1;

        const oldSize = computeSize(rzContainer, dimension);
        const newSize = Math.max(rzContainerMeta[dimension]["min"], oldSize + delta * direction);

        rzContainer.style[dimension] = `${newSize}px`;
        adjustRzContainerSize(oppositeDimension[dimension]);

        oldCursorPos[axis] = newCoord;
    };

    const debouncedResize = debounce(resize, 5);
    let resizeListener: (e: MouseEvent) => void;

    const stopResize = () => {
        document.documentElement.style.cursor = "var(--cursor-landing)";
        document.documentElement.style.pointerEvents = "";
        document.documentElement.style.userSelect = "";

        window.removeEventListener("mousemove", resizeListener);
        window.removeEventListener("mouseup", stopResize);
    };

    return {
        startResize,
    }
}