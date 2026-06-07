<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  sizeRem?: number;
  borderWidthRem?: number;
}>(), {
  sizeRem: 3.5,
  borderWidthRem: 0.35
});

const style = computed(() => ({
  width: `${props.sizeRem}rem`,
  height: `${props.sizeRem}rem`,
  borderWidth: `${props.borderWidthRem}rem`,
}));
</script>

<template>
  <div class="rounded-full border-(--color-secondary) border-t-(--color-primary) border-r-(--color-primary)
              animate-spin"
       :style/>
</template>