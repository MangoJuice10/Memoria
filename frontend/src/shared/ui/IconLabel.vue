<script setup lang="ts">
defineProps<{
  isReverse?: boolean,
}>();
</script>

<template>
  <span class="icon-static
               inline-flex justify-center items-center gap-2.5">
    <template v-if="!isReverse">
      <slot name="icon"/>
      <slot name="label"/>
    </template>
    <template v-else>
      <slot name="label"/>
      <slot name="icon"/>
    </template>
  </span>
</template>