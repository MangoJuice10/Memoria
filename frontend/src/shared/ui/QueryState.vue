<script setup lang="ts">
import {Error, Loader} from "@/shared/ui/index.ts";

defineProps<{
  isLoading: boolean;
  error: Error | null;
  errorClasses?: string;
  errorImgClasses?: string;
  errorLabelClasses?: string;
  loaderClasses?: string;
}>();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div v-if="isLoading"
       v-bind="$attrs"
       class="flex justify-center items-center
              w-full h-full">
    <Loader :class="loaderClasses"/>
  </div>
  <div v-else-if="error"
       v-bind="$attrs"
       class="flex justify-center items-center
              w-full h-full">
    <Error :img-classes="errorImgClasses"
           :label-classes="errorLabelClasses"
           :class="errorClasses">
      {{ error.message }}
    </Error>
  </div>
  <div v-else
       v-bind="$attrs">
    <slot/>
  </div>
</template>