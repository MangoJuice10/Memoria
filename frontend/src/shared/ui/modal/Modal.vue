<script setup lang="ts">
import {Resizable} from "@/shared/ui";
</script>
<template>
  <div class="modal
              fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50
              w-fit h-fit max-w-8/10 sm:max-w-7/10 md:max-w-6/10 max-h-6/7 overflow-hidden
              border border-default rounded-2xl text-base
              bg-tertiary">
    <Resizable center
               has-left-resize-handle
               has-right-resize-handle
               has-top-resize-handle
               has-bottom-resize-handle>
      <slot/>
    </Resizable>
  </div>
</template>