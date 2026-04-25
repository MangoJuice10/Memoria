<script setup lang="ts">
import {useResizable} from "@/shared/resizable/lib/useResizable"

type Props = {
  minWidth?: string;
  minHeight?: string;
  hasTopResizeHandle?: boolean;
  hasRightResizeHandle?: boolean;
  hasBottomResizeHandle?: boolean;
  hasLeftResizeHandle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hasTopResizeHandle: false,
  hasRightResizeHandle: false,
  hasBottomResizeHandle: false,
  hasLeftResizeHandle: false,
});

const {startResize} = useResizable(props);

</script>

<template>
  <div ref="resizable-container" class="resizable flex relative w-fit h-fit">
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
.resizable > :slotted(:first-child) {
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