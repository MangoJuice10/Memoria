<script setup lang="ts">
defineProps<{
  isReverse?: boolean,
}>();
</script>

<template>
  <span class="inline-flex justify-center items-center gap-2.5">
    <template v-if="!isReverse">
      <span class="grow-0 shrink-0 icon-static">
        <slot name="icon"/>
      </span>
      <slot name="label"/>
    </template>
    <template v-else>
      <slot name="label"/>
      <span class="grow-0 shrink-0 icon-static">
        <slot name="icon"/>
      </span>
    </template>
  </span>
</template>