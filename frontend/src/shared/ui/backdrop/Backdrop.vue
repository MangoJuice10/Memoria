<script setup lang="ts">
import {useBackdropStore} from "@/shared/model";

const backdropStore = useBackdropStore();

const handleClick = () => {
  backdropStore.hide();
  backdropStore.callback?.();
};
</script>

<template>
  <Transition name="backdrop">
    <div v-if="backdropStore.isVisible"
         class="fixed inset-0 bg-primary/50 backdrop-blur-xs z-30"
         @click="handleClick"/>
  </Transition>
</template>

<style scoped>
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.backdrop-enter-to,
.backdrop-leave-from {
  opacity: 1;
  backdrop-filter: blur(5px);
}

.backdrop-enter-active {
  transition: opacity 400ms cubic-bezier(0.4, 0, 0.2, 1),
              backdrop-filter 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

.backdrop-leave-active {
  transition: opacity 600ms cubic-bezier(0.4, 0, 0.2, 1),
              backdrop-filter 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>