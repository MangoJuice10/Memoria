<script setup lang="ts">
import {useOverlay} from "@/composables/useOverlay";
import Overlay from "@/components/overlay/Overlay.vue";

const {isOverlayVisible} = useOverlay();

</script>
<template>
  <div>
    <Overlay v-if="isOverlayVisible" v-model:is-visible="isOverlayVisible"/>
    <RouterView/>
  </div>
</template>