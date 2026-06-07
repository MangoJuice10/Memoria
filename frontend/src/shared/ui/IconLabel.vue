<script setup lang="ts">
defineProps<{
  isReverse?: boolean,
}>();
</script>

<template>
  <div v-if="!isReverse"
        class="icon-label icon-static
               flex justify-center items-center">
      <slot name="icon"/>
      <slot name="label"/>
  </div>
  <div v-else
        class="icon-label-reverse icon-static
               flex justify-center items-center">
      <slot name="label"/>
      <slot name="icon"/>
  </div>
</template>

<style scoped>
.icon-label > :first-child {
  flex-shrink: 0;
}

.icon-label-reverse > :last-child {
  flex-shrink: 0;
}
</style>