<script setup lang="ts">
import IconLabel from "../IconLabel.vue";

withDefaults(defineProps<{
  isReverse?: boolean,
  isActive?: boolean
}>(), {
  isReverse: false,
  isActive: false
});
</script>

<template>
  <button class="flex justify-center items-center
                 px-3 py-2 border rounded-2xl"
          :class="isActive
                  ? 'border-default text-inverse bg-secondary'
                  : 'border-transparent hover:border-default hover:bg-hover'">
    <IconLabel :is-reverse>
      <template #icon>
        <slot name="icon"/>
      </template>
      <template #label>
        <slot name="label"/>
      </template>
    </IconLabel>
  </button>
</template>