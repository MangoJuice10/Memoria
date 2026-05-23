<script setup lang="ts">
import {ErrorIllustration} from "@/shared/ui";

defineProps<{
  imgClasses?: string;
  labelClasses?: string;
}>();
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <ErrorIllustration class="icon-dynamic
                              w-full h-full"
                       :class="imgClasses"/>
    <span class="text-3xl font-black text-center"
          :class="labelClasses">
      <slot/>
    </span>
  </div>
</template>