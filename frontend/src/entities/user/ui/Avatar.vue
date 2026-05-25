<script setup lang="ts">
defineProps<{
  src: string;
}>();
</script>

<template>
  <img :src alt=""
       class="border rounded-full border-default object-cover bg-tertiary">
</template>