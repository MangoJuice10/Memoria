<script setup lang="ts">
import { ref, computed } from "vue";
const isAbsolute = ref(false);
const positionClasses = computed(() =>
  isAbsolute.value ? ["top-0", "right-0", "absolute"] : ["relative"]
);
</script>

<template>
  <div
    :class="['bg-blue-500 text-white p-2', positionClasses]"
    @click="isAbsolute = !isAbsolute"
  >
    I move
  </div>
</template>
<style class="scoped"></style>
