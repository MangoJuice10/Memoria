<script setup lang="ts">
const props = defineProps<{
  header: string,
}>();
</script>

<template>
<div v-text="header" class="text-2xl font-semibold text-center"/>
</template>

