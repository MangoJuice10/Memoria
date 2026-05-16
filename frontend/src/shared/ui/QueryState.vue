<script setup lang="ts">
import {Error, Loader} from "@/shared/ui/index.ts";

defineOptions({
  inheritAttrs: false,
});

defineProps<{
  isLoading: boolean;
  error: Error | null;
}>();
</script>

<template>
  <div v-if="isLoading"
       v-bind="$attrs"
       class="flex justify-center items-center
              w-full h-full">
    <Loader/>
  </div>
  <div v-else-if="error"
       v-bind="$attrs"
       class="flex justify-center items-center
              w-full h-full">
    <Error>
      {{ error.message }}
    </Error>
  </div>
  <div v-else
       v-bind="$attrs">
    <slot/>
  </div>
</template>