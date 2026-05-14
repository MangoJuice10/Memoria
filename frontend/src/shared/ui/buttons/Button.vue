<script setup lang="ts">
withDefaults(defineProps<{
  enabled?: boolean;
  hasColor?: boolean,
  hasHoverColor?: boolean,
  hasActiveColor?: boolean,
}>(), {
  enabled: true,
  hasColor: true,
  hasHoverColor: true,
  hasActiveColor: true,
});
</script>

<template>
  <button
      :disabled="!enabled"
      class="flex justify-center items-center
             w-fit p-button border border-default rounded-xl
             text-inverse font-semibold
             enabled:hover:scale-105 enabled:active:scale-110
             disabled:text-disabled disabled:bg-disabled
             transition-all ease-in duartion-300"
      :class="{
        'bg-secondary': hasColor,
        'enabled:hover:bg-hover hover:text-hover': hasHoverColor,
        'enabled:active:bg-primary enabled:active:text-default': hasActiveColor
      }">
    <slot/>
  </button>
</template>