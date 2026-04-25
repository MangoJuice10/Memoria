<script setup lang="ts">
defineProps<{
  isReverse?: boolean,
}>();
</script>

<template>
  <div class="inline-flex justify-center items-center gap-2.5">
    <template v-if="!isReverse">
      <div class="grow-0 shrink-0 icon-static">
        <slot name="icon"/>
      </div>
      <slot name="label"/>
    </template>
    <template v-else>
      <slot name="label"/>
      <div class="grow-0 shrink-0 icon-static">
        <slot name="icon"/>
      </div>
    </template>
  </div>
</template>