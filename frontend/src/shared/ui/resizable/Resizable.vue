<script setup lang="ts">
import {useResizable, type ResizableOptions} from "@/shared/lib";
import {provide} from "vue";
import {resizableNaturalResizeKey} from "@/shared/config";

const props = withDefaults(defineProps<ResizableOptions>(), {
  center: false,
  hasTopResizeHandle: false,
  hasRightResizeHandle: false,
  hasBottomResizeHandle: false,
  hasLeftResizeHandle: false,
});

const {startResize, handleNaturalResize} = useResizable(props);

provide(resizableNaturalResizeKey, handleNaturalResize);
</script>

<template>
  <div ref="resizable-container"
       class="resizable flex relative"
       :class="center && 'justify-center items-center'">
    <slot/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'top')"
         v-if="hasTopResizeHandle"
         class="absolute inset-x-0 bottom-full translate-y-1/2
                w-full h-2
                cursor-ns-resize"/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'right')"
         v-if="hasRightResizeHandle"
         class="absolute inset-y-0 left-full -translate-x-1/2
                w-2 h-full
                cursor-ew-resize"/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'bottom')"
         v-if="hasBottomResizeHandle"
         class="absolute inset-x-0 top-full -translate-y-1/2
                h-2 w-full
                cursor-ns-resize"/>
    <div @mousedown="(e: MouseEvent) => startResize(e, 'left')"
         v-if="hasLeftResizeHandle"
         class="absolute inset-y-0 right-full translate-x-1/2
                w-2 h-full
                cursor-ew-resize"/>
  </div>
</template>

<style scoped>
.resizable > :slotted(:first-child) {
  flex-grow: 1;
  overflow-y: auto;
}

:slotted(img) {
  height: 100%;
  width: 100%;
  min-height: 0;
  min-width: 0;
  object-fit: fill;
}
</style>