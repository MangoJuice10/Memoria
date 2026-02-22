<script setup lang="ts">
import {useTemplateRef, onMounted} from "vue";
import {
  computeSize,
  computeMinSize,
  isMovingPastElement,
  breakpoints
} from "@/utils/dom";
import {debounce} from "@/utils/debounce";
import {capitalize} from "@/utils/capitalize";
import type {Axis, Side, Dimension} from "@/types/dom";

const props = withDefaults(defineProps<{
  minWidth?: string;
  minHeight?: string;
  hasTopResizeHandle?: boolean;
  hasRightResizeHandle?: boolean;
  hasBottomResizeHandle?: boolean;
  hasLeftResizeHandle?: boolean;
}>(), {
  hasTopResizeHandle: false,
  hasRightResizeHandle: false,
  hasBottomResizeHandle: false,
  hasLeftResizeHandle: false,
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

const rzContainerRef = useTemplateRef<HTMLElement | null>("resizable-container");

let rzContainer: HTMLElement,
    rzEl: HTMLElement;

let rzContainerMeta = {
  width: {
    base: NaN,
    min: NaN,
  },
  height: {
    base: NaN,
    min: NaN,
  }
};

let oldCursorPos = {
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
  if (props.minWidth) {
    rzContainer.style.minWidth = props.minWidth;
    rzContainerMeta.width.min = computeMinSize(rzContainer, "width");
  } else {
    rzContainerMeta.width.min = computeRzContainerMinSize("width");
  }

  if (props.minHeight) {
    rzContainer.style.minHeight = props.minHeight;
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
  if (!props[`min${capitalize(dimension)}`]) rzContainerMeta[dimension]["min"] = computedMinSize;
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

let debouncedResize = debounce(resize, 5);
let resizeListener: (e: MouseEvent) => void;

const stopResize = () => {
  document.documentElement.style.cursor = "var(--cursor-default)";
  document.documentElement.style.pointerEvents = "";
  document.documentElement.style.userSelect = "";

  window.removeEventListener("mousemove", resizeListener);
  window.removeEventListener("mouseup", stopResize);
};
</script>

<template>
  <div ref="resizable-container" class="flex relative w-fit h-fit">
    <slot/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'top')"
         v-if="hasTopResizeHandle"
         class="absolute inset-x-0 -translate-y-1/2 w-full h-2 cursor-ns-resize"/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'right')"
         v-if="hasRightResizeHandle"
         class="absolute inset-y-0 right-0 translate-x-1/2 w-2 h-full cursor-ew-resize"/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'bottom')"
         v-if="hasBottomResizeHandle"
         class="absolute inset-x-0 bottom-0 translate-y-1/2 h-2 w-full cursor-ns-resize"/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'left')"
         v-if="hasLeftResizeHandle"
         class="absolute inset-y-0 -translate-x-1/2 w-2 h-full cursor-ew-resize"/>
  </div>
</template>

<style scoped>
:slotted(*) {
  flex-grow: 1;
  min-width: 0;
}

:slotted(img) {
  height: 100%;
  width: 100%;
  min-height: 0;
  min-width: 0;
  object-fit: fill;
}
</style>