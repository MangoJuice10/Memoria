<script setup lang="ts">
defineProps<{
  heading: string;
  content: string;
}>();
</script>

<template>
  <div class="absolute inset-0
              flex flex-col divide-y divide-default
              border border-default rounded-2xl
              shadow-lg
              bg-primary
              backface-hidden">
    <h2 class="p-10">
      {{ heading }}
    </h2>
    <p class="h-full p-10 overflow-y-auto
              text-xl">
      {{ content }}
    </p>
  </div>
</template>