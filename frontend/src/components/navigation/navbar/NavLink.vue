<script setup lang="ts">
defineProps<{
  href: string;
}>();
</script>

<template>
  <RouterLink :to="href">
    <slot/>
  </RouterLink>
</template>