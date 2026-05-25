import {useTemplateRef, onMounted, onBeforeUnmount} from "vue";
import {
    computeSize,
    computeMinSize,
    computeMaxSize,
    isMovingPastElement,
    addBreakpointsListener,
    removeBreakpointsListener,
} from "@/shared/lib/index.ts";
import {debounce} from "@/shared/lib/debounce.ts";
import {capitalize} from "@/shared/lib/capitalize.ts";
import type {Axis, Side, Dimension} from "@/shared/lib/dom/dom.ts";

export type ResizableOptions = {
    center?: boolean;
    hasTopResizeHandle?: boolean;
    hasRightResizeHandle?: boolean;
    hasBottomResizeHandle?: boolean;
    hasLeftResizeHandle?: boolean;
}

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

export const useResizable = (options: ResizableOptions) => {
    const rzContainerRef = useTemplateRef<HTMLElement>("resizable-container");
    let rzContainer: HTMLElement;

    const rzContainerMeta = {
        width: {
            base: NaN,
            min: NaN,
            max: NaN,
        },
        height: {
            base: NaN,
            min: NaN,
            max: NaN
        }
    } satisfies Record<Dimension, Record<string, number>>;

    const oldCursorPos = {
        x: 0,
        y: 0,
    } satisfies Record<Axis, number>;

    onMounted(() => {
        if (!rzContainerRef.value) throw new Error("Resizable container didn't render");
        if (!(rzContainerRef.value instanceof HTMLElement)) throw new Error("Resizable container must be an HTML Element");
        rzContainer = rzContainerRef.value;

        const resizeObserver = new ResizeObserver(entries => {
            if (!entries[0]) throw new Error("Resizable container didn't render");
            const {width, height} = entries[0].contentRect;
            if (width > 0 && height > 0) {
                setRzContainerMeta();

                resizeObserver.disconnect();
            }
        });
        resizeObserver.observe(rzContainer);

        addBreakpointsListener(setRzContainerMinMaxDimensions);
    });

    onBeforeUnmount(() => {
        removeBreakpointsListener(setRzContainerMinMaxDimensions);
    });

    const setRzContainerBaseDimensions = () => {
        if (options.hasLeftResizeHandle || options.hasRightResizeHandle) {
            rzContainerMeta.width.base = Math.min(Math.max(computeSize(rzContainer, "width"), rzContainerMeta.width.min), rzContainerMeta.width.max);
            rzContainer.style.width = `${rzContainerMeta.width.base}px`;
        }

        if (options.hasTopResizeHandle || options.hasBottomResizeHandle) {
            rzContainerMeta.height.base = Math.min(Math.max(computeSize(rzContainer, "height"), rzContainerMeta.height.min), rzContainerMeta.height.max);
            rzContainer.style.height = `${rzContainerMeta.height.base}px`;
        }
    };

    const setRzContainerMinDimensions = () => {
        const baseWidth = computeSize(rzContainer, "width");
        const suggestedMinWidth = computeMinSize(rzContainer, "width");
        rzContainerMeta.width.min = suggestedMinWidth <= baseWidth ? suggestedMinWidth : baseWidth;

        const baseHeight = computeSize(rzContainer, "height");
        const suggestedMinHeight = computeMinSize(rzContainer, "height");
        rzContainerMeta.height.min = suggestedMinHeight <= baseHeight ? suggestedMinHeight : baseHeight;
    };

    const setRzContainerMaxDimensions = () => {
        rzContainerMeta.width.max = computeMaxSize(rzContainer, "width");
        rzContainerMeta.height.max = computeMaxSize(rzContainer, "height");
    };

    const setRzContainerMinMaxDimensions = () => {
        setRzContainerMinDimensions();
        setRzContainerMaxDimensions();
    };

    const setRzContainerMeta = () => {
        setRzContainerMinMaxDimensions();
        setRzContainerBaseDimensions();
    };

    const handleResize = (e: MouseEvent, rzHandle: HTMLElement, side: Side) => {
        const dimension = sideToDimension[side];
        const axis = dimensionToAxis[dimension];

        const oldCoord = oldCursorPos[axis];
        const newCoord = e[`client${capitalize(dimensionToAxis[dimension])}`];

        if (!isMovingPastElement(oldCoord, newCoord, rzHandle, dimension)) {
            oldCursorPos[axis] = newCoord;
            return;
        }

        const coordinatesDelta = computeCoordinatesDelta(oldCoord, newCoord);
        const direction = side === "right" || side === "bottom" ? 1 : -1;
        resize(rzContainer, dimension, coordinatesDelta * direction);
        resize(rzContainer, oppositeDimension[dimension], 0);

        oldCursorPos[axis] = newCoord;
    };

    const computeCoordinatesDelta = (oldCoord: number, newCoord: number) => {
        return newCoord - oldCoord;
    };

    const resize = (el: HTMLElement, dimension: Dimension, delta: number) => {
        setRzContainerMinMaxDimensions();

        const oldSize = computeSize(rzContainer, dimension);
        const newSize = Math.min(Math.max(oldSize + delta, rzContainerMeta[dimension]["min"]), rzContainerMeta[dimension]["max"]);
        el.style[dimension] = `${newSize}px`;

        return Math.abs(newSize - oldSize);
    };

    const debouncedHandleResize = debounce(handleResize, 5);

    const startResize = (startResizeEvent: MouseEvent, side: Side) => {
        const rzHandle = startResizeEvent.currentTarget as HTMLElement;

        [oldCursorPos.x, oldCursorPos.y] = [startResizeEvent.clientX, startResizeEvent.clientY];
        rzListener = (resizeEvent: MouseEvent) => {
            debouncedHandleResize(resizeEvent, rzHandle, side);
        };

        document.documentElement.style.cursor = sideToDimension[side] === "width" ? "var(--cursor-ew-resize)" : "var(--cursor-ns-resize)";
        document.documentElement.style.pointerEvents = "none";
        document.documentElement.style.userSelect = "none";

        window.addEventListener("mousemove", rzListener);
        window.addEventListener("mouseup", stopResize);
    };

    const stopResize = () => {
        document.documentElement.style.cursor = "var(--cursor-landing)";
        document.documentElement.style.pointerEvents = "";
        document.documentElement.style.userSelect = "";

        window.removeEventListener("mousemove", rzListener);
        window.removeEventListener("mouseup", stopResize);
    };

    let rzListener: (e: MouseEvent) => void;

    const handleNaturalResize = () => {
        setRzContainerMeta();
    };

    return {
        startResize,
        handleNaturalResize
    };
};