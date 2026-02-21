<script setup lang="ts">
import {useTemplateRef, onMounted} from "vue";
import {
  computeSize,
  computeMinSize,
  isMovingPastElement,
} from "@/utils/dom";
import {debounce} from "@/utils/debounce";
import {capitalize} from "@/utils/capitalize";
import type {Axis, Side, Dimension} from "@/types/dom";

const props = withDefaults(defineProps<{
  minWidth?: number;
  minHeight?: number;
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

const computeRzContainerMinSize = (dimension: Dimension) => {
  return rzEl instanceof HTMLImageElement ? 0 : computeMinSize(rzContainer, dimension);
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
      rzContainerMeta.width.base = computeSize(rzContainer, "width");
      rzContainerMeta.height.base = computeSize(rzContainer, "height");
      rzContainer.style.width = `${rzContainerMeta.width.base}px`;
      rzContainer.style.height = `${rzContainerMeta.height.base}px`;

      rzContainerMeta.width.min = props.minWidth ? props.minWidth : computeRzContainerMinSize("width");
      rzContainerMeta.height.min = props.minHeight ? props.minHeight : computeRzContainerMinSize("height");

      resizeObserver.disconnect();
    }
  });
  resizeObserver.observe(rzContainer);
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
  if (rzEl instanceof HTMLImageElement) return;
  rzContainerMeta[dimension]["min"] = computeRzContainerMinSize(dimension);
  if (rzContainerMeta[dimension]["min"] > rzContainer.getBoundingClientRect()[dimension]) rzContainer.style[dimension] = `${rzContainerMeta[dimension]["min"]}px`;
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
  <div ref="resizable-container" class="grid relative w-fit h-fit">
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
  :slotted(img) {
    object-fit: fill;
  }
</style>