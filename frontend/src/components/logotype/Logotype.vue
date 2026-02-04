<script setup lang="ts">
import logotypeGraphical from '@/assets/logotypes/logotypeGraphical.svg';
import logotypeText from '@/assets/logotypes/logotypeText.svg';

const props = withDefaults(defineProps<{
  mode?: "text" | "graphical" | "full",
}>(), {
  mode: "full"
});
</script>

<template>
  <div class="inline-flex justify-between items-center gap-2.5 w-fit">
    <img :src="logotypeGraphical" alt="" :class="[mode === 'graphical' || mode === 'full' ? 'block' : 'hidden', 'w-15 aspect-square select-none']">
    <img :src="logotypeText" alt="" :class="[mode === 'text' || mode === 'full' ? 'block' : 'hidden', 'w-34.5 select-none']">
  </div>
</template>