<script setup lang="ts">
const modelValue = defineModel<string>();
</script>

<template>
  <input v-model="modelValue"
         class="w-full h-13 pl-2.5 pr-15 py-1.25 border rounded-lg border-default
                bg-primary
                hover:outline-3 hover:-outline-offset-1 hover:outline-active">
</template>