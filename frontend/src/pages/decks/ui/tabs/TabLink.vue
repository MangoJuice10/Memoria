<script setup lang="ts">
defineProps<{
  isActive: boolean,
  callback: (...args: unknown[]) => void
}>();
</script>

<template>
  <div @click="callback"
       class="cursor-pointer"
       :class="{'font-bold underline': isActive}">
    <slot/>
  </div>
</template>