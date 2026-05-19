<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  src: string;
  sizeRem: number;
}>();

const style = computed(() => ({
  width: `${props.sizeRem}rem`,
  height: `${props.sizeRem}rem`,
}));
</script>

<template>
  <img :src alt=""
       class="border rounded-full border-default object-cover"
       :style>
</template>