<script setup lang="ts">
defineProps<{
  isVisible: boolean
}>();

const emit = defineEmits<{
  (e: "update:isVisible", value: boolean): void;
}>();

const hideBackdrop = () => emit("update:isVisible", false);
</script>

<template>
  <Transition name="backdrop">
    <div @click="hideBackdrop" v-if="isVisible" class="fixed inset-0 bg-primary opacity-50 z-50"/>
  </Transition>
</template>

<style scoped>
  .backdrop-enter-from {
    opacity: 0;
  }

  .backdrop-enter-to {
    opacity: 1;
  }

  .backdrop-enter-active {
    transition: opacity 500ms ease;
  }

  .backdrop-leave-from {
    opacity: 1;
  }

  .backdrop-leave-to {
    opacity: 0;
  }

  .backdrop-leave-active {
    transition: opacity 500ms ease;
  }
</style>