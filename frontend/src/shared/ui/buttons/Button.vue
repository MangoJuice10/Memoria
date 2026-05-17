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
             min-w-fit p-button border border-default rounded-xl
             text-inverse font-semibold
             enabled:shadow-[0px_4px_0px_0px_var(--color-secondary),0px_5px_0px_0px_var(--color-border-default)]
             disabled:shadow-[0px_4px_0px_0px_var(--color-surface-disabled),0px_5px_0px_0px_var(--color-border-default)]
             transition-all ease-in duartion-300
             enabled:hover:scale-105
             enabled:active:translate-y-1 enabled:active:shadow-none
             disabled:text-disabled disabled:bg-disabled"
      :class="{
        'bg-secondary': hasColor,
        ['enabled:hover:text-hover enabled:hover:bg-hover\n' +
        'enabled:hover:shadow-[0px_4px_0px_0px_var(--color-surface-hover),0px_5px_0px_0px_var(--color-border-default)]']: hasHoverColor,
        'enabled:active:bg-primary enabled:active:text-default': hasActiveColor
      }">
    <slot/>
  </button>
</template>