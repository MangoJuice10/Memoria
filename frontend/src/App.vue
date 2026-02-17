<script setup lang="ts">
import {ref, provide} from "vue";
import Overlay from "@/components/overlay/Overlay.vue";

const isOverlayVisible = ref(false);
provide("overlay", {
  isOverlayVisible,
  showOverlay: () => isOverlayVisible.value = true,
  hideOverlay: () => isOverlayVisible.value = false,
  toggleOverlay: () => isOverlayVisible.value = !isOverlayVisible.value,
});
</script>
<template>
  <div>
    <Overlay v-if="isOverlayVisible" v-model:is-visible="isOverlayVisible"/>
    <RouterView/>
  </div>
</template>