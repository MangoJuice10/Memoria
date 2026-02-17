<script setup lang="ts">
withDefaults(defineProps<{
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

type Side = "top" | "right" | "bottom" | "left";
type Dimension = "width" | "height";

const sideToDimension: Record<Side, Dimension> = {
  "top": "height",
  "right": "width",
  "bottom": "height",
  "left": "width",
};

let
    lastX: number,
    lastY: number;

const startResize = (startResizeEvent: MouseEvent, side: Side) => {
  const resizeHandle = startResizeEvent.currentTarget;
  if (!resizeHandle) return;
  if (!(resizeHandle instanceof HTMLElement)) return;
  const resizableContainer = resizeHandle.parentElement;
  if (!resizableContainer) return;

  [lastX, lastY] = [startResizeEvent.clientX, startResizeEvent.clientY];
  resizeListener = (resizeEvent: MouseEvent) => {
    resize(resizeEvent, resizableContainer, side);
  };
  window.addEventListener("mousemove", resizeListener);
  window.addEventListener("mouseup", stopResize);
};

const resize = (e: MouseEvent, el: HTMLElement, side: Side) => {
  const [curX, curY] = [e.clientX, e.clientY];
  let
      delta: number,
      direction: number;
  if (sideToDimension[side] === "width") delta = curX - lastX;
  else delta = curY - lastY;

  if (side === "right" || side === "bottom") direction = 1;
  else direction = -1;

  el.style[sideToDimension[side]] = `${parseFloat(window.getComputedStyle(el)[sideToDimension[side]]) + delta * direction}px`;
  [lastX, lastY] = [curX, curY];
};

const stopResize = () => {
  window.removeEventListener("mousemove", resizeListener);
  window.removeEventListener("mouseup", stopResize);
};

let resizeListener: (e: MouseEvent) => void;
</script>

<template>
  <div class="relative flex justify-stretch items-stretch w-fit">
    <div @mousedown="(e: MouseEvent) => startResize(e, 'top')"
         v-if="hasTopResizeHandle"
         class="absolute inset-x-0 -translate-y-full w-full h-2 z-1000 bg-secondary cursor-ns-resize"/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'right')"
         v-if="hasRightResizeHandle"
         class="absolute inset-y-0 right-0 translate-x-full w-2 h-full z-1000 bg-secondary cursor-ew-resize"/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'bottom')"
         v-if="hasBottomResizeHandle"
         class="absolute inset-x-0 bottom-0 translate-y-full h-2 w-full z-1000 bg-secondary cursor-ns-resize"/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'left')"
         v-if="hasLeftResizeHandle"
         class="absolute inset-y-0 -translate-x-full w-2 h-full z-1000 bg-secondary cursor-ew-resize"/>
    <slot/>
  </div>
</template>