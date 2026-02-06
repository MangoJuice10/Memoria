<script setup lang="ts">
defineProps<{
  text: string,
  isReverse?: boolean,
}>();
</script>

<template>
  <div
      class="inline-flex justify-center items-center gap-2.5 icon"
      :class="{'flex-row-reverse': isReverse}">
    <slot/>
    <span v-text="text" class="hidden md:inline"></span>
  </div>
</template>

