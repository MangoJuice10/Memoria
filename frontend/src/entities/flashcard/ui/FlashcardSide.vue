<script setup lang="ts">
defineProps<{
  heading: string;
  content: string;
}>()
</script>

<template>
  <div class="absolute inset-0
                flex flex-col divide-y divide-default
                border border-default rounded-2xl
                bg-primary
                backface-hidden">
    <h2 class="px-10 py-10">{{ heading }}</h2>
    <p class="flex justify-center items-center h-full
                p-10
                text-xl">{{ content }}</p>
  </div>
</template>