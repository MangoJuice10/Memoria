<script setup lang="ts">
import {Resizable} from "@/shared/resizable";
</script>
<template>
  <div class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50
              w-fit h-fit max-w-5/7 max-h-6/7 overflow-hidden
              border border-default rounded-2xl text-base
              bg-tertiary">
    <Resizable has-left-resize-handle has-right-resize-handle has-top-resize-handle has-bottom-resize-handle>
      <slot/>
    </Resizable>
  </div>
</template>