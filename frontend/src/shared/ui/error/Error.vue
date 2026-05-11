<script setup lang="ts">
import {ErrorIcon} from "@/shared/ui/icons";

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div class="icon-dynamic
              flex flex-col justify-center items-center">
    <div class="w-80" v-bind="$attrs">
      <ErrorIcon/>
    </div>
    <div class="text-3xl font-black text-center">
      <slot/>
    </div>
  </div>
</template>