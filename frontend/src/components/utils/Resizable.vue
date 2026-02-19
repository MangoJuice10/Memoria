<script setup lang="ts">
import {useTemplateRef, onMounted} from "vue";
import {
  computeMinSize,
  isMovingUpPastElement,
  isMovingRightPastElement,
  isMovingDownPastElement,
  isMovingLeftPastElement
} from "@/utils/dom";
import {debounce} from "@/utils/debounce";
import type { Side, Dimension} from "@/types/dom";

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

let minWidth: number,
    minHeight: number;

let oldX: number,
    oldY: number;

const resizableContainerRef = useTemplateRef<HTMLElement | null>("resizable-container");

onMounted(() => {
  if (props.minWidth && props.minHeight) return;

  const resizableContainer = resizableContainerRef.value;
  if (!resizableContainer) throw new Error("Resizable container didn't render");

  if (props.minWidth) {
    minWidth = props.minWidth;
  } else {
    minWidth = computeMinSize(resizableContainer, "width");
  }

  if (props.minHeight) {
    minHeight = props.minHeight;
  } else {
    minHeight = computeMinSize(resizableContainer, "height");
  }
});

const startResize = (startResizeEvent: MouseEvent, side: Side) => {
  const resizeHandle = startResizeEvent.currentTarget;
  if (!resizeHandle) return;
  if (!(resizeHandle instanceof HTMLElement)) return;
  const resizableContainer = resizeHandle.parentElement;
  if (!resizableContainer) return;

  [oldX, oldY] = [startResizeEvent.clientX, startResizeEvent.clientY];
  resizeListener = (resizeEvent: MouseEvent) => {
    debouncedResize(resizeEvent, resizeHandle, resizableContainer, side);
  };
  document.documentElement.style.cursor = sideToDimension[side] === "width" ? "var(--cursor-ew-resize)" : "var(--cursor-ns-resize)";
  document.documentElement.style.pointerEvents = "none";
  document.documentElement.style.userSelect = "none";
  window.addEventListener("mousemove", resizeListener);
  window.addEventListener("mouseup", stopResize);
};

const resize = (e: MouseEvent, resizeHandle: HTMLElement, resizableContainer: HTMLElement, side: Side) => {
  const [newX, newY] = [e.clientX, e.clientY];
  const propertyName = sideToDimension[side];

  const resizableContainerBR = resizableContainer.getBoundingClientRect();
  const resizeHandleBR = resizeHandle.getBoundingClientRect();

  if (propertyName === "width") {
    if (!(isMovingLeftPastElement(oldX, newX, resizeHandleBR.left) ||
        isMovingRightPastElement(oldX, newX, resizeHandleBR.right))) {
      oldX = newX;
      return;
    }
    const deltaX = newX - oldX;
    const direction = side === "right" ? 1 : -1;

    const oldWidth = resizableContainerBR.width;
    const newWidth = Math.max(minWidth, oldWidth + deltaX * direction);
    resizableContainer.style.width = `${newWidth}px`;

    minHeight = computeMinSize(resizableContainer, "height");
    if (minHeight > resizableContainer.getBoundingClientRect().height) resizableContainer.style.height = `${minHeight}px`;
    oldX = newX;
  } else {
    if (!(isMovingUpPastElement(oldY, newY, resizeHandleBR.top) ||
        isMovingDownPastElement(oldY, newY, resizeHandleBR.bottom))) {
      oldY = newY;
      return;
    }
    const deltaY = newY - oldY;
    const direction = side === "bottom" ? 1 : -1;

    const oldHeight = resizableContainerBR.height;
    const newHeight = Math.max(minHeight, oldHeight + deltaY * direction);
    resizableContainer.style.height = `${newHeight}px`;

    minWidth = computeMinSize(resizableContainer, "width");
    if (minWidth > resizableContainer.getBoundingClientRect().width) resizableContainer.style.width = `${minWidth}px`;
    oldY = newY;
  }
};

const stopResize = () => {
  document.documentElement.style.cursor = "var(--cursor-default)";
  document.documentElement.style.pointerEvents = "";
  document.documentElement.style.userSelect = "";
  window.removeEventListener("mousemove", resizeListener);
  window.removeEventListener("mouseup", stopResize);
};

let debouncedResize = debounce(resize, 5);
let resizeListener: (e: MouseEvent) => void;
</script>

<template>
  <div ref="resizable-container" class="flex relative">
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
    <slot/>
  </div>
</template>

<style scoped>
:slotted(*) {
  flex-grow: 1;
}
</style>