<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  sizeRem?: number;
}>(), {
  sizeRem: 1.8,
});

const style = computed(() => ({
  width: `${props.sizeRem}rem`,
  height: `${props.sizeRem}rem`,
}));

</script>
<template>
  <div class="border rounded-full border-transparent
       hover:border-default hover:bg-hover cursor-pointer
       focus-visible:border-default focus-visible:bg-focus"
       :style
       role="button" tabindex="0"
       @keydown.enter="$emit('click')"
       @keydown.space="$emit('click')">
    <slot/>
  </div>
</template>

<style scoped>
:slotted(:first-child) {
  margin: 15%;
}
</style>