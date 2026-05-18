<script setup lang="ts">
import {useToastStore} from "@/shared/model";
import Toast from "@/shared/ui/toast/Toast.vue";
import {storeToRefs} from "pinia";

const {toasts} = storeToRefs(useToastStore());
</script>

<template>
  <div class="fixed bottom-page right-page z-60
              flex flex-col-reverse gap-5
              w-100 overflow-visible truncate">
    <TransitionGroup name="toast">
      <Toast v-for="toast in toasts"
             :key="toast.id"
             :id="toast.id"
             :message="toast.message"
             :type="toast.type"
             :icon="toast.icon"
             :duration="toast.duration"/>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 1s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(1rem);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(1rem);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>