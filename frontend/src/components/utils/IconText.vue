<script setup lang="ts">
const props = defineProps<{
  text: string,
  isReverse?: boolean,
}>();
</script>

<template>
  <div
      class="inline-flex justify-center items-center gap-2.5 icon"
      :class="{'flex-row-reverse': isReverse}">
    <slot/>
    <span v-text="text"></span>
  </div>
</template>

