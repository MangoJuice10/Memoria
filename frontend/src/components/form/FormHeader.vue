<script setup lang="ts">
defineProps<{
  heading: string,
}>();
</script>

<template>
<div v-text="heading" class="text-2xl font-semibold text-center"/>
</template>

