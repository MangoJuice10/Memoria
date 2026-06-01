<script setup lang="ts">
withDefaults(defineProps<{
  display?: "vertical" | "horizontal" | "custom"
}>(), {
  display: "custom"
});
</script>
<template>
  <div :class="[
                 display === 'vertical' && 'flex flex-col items-center divide-y divide-default',
                 display === 'horizontal' && 'flex justify-center items-center'
               ]">
    <slot/>
  </div>
</template>