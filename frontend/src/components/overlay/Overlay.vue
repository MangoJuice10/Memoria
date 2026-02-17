<script setup lang="ts">
defineProps<{
  isVisible: boolean
}>();

const emit = defineEmits<{
  (e: "update:isVisible", value: boolean): void;
}>();

const hideOverlay = () => emit("update:isVisible", false);
</script>

<template>
  <Transition name="overlay">
    <div @click="hideOverlay" v-if="isVisible" class="fixed inset-0 bg-primary opacity-50 z-50"/>
  </Transition>
</template>

<style scoped>
  .overlay-enter-from {
    opacity: 0;
  }

  .overlay-enter-to {
    opacity: 1;
  }

  .overlay-enter-active {
    transition: opacity 500ms ease;
  }

  .overlay-leave-from {
    opacity: 1;
  }

  .overlay-leave-to {
    opacity: 0;
  }

  .overlay-leave-active {
    transition: opacity 500ms ease;
  }
</style>