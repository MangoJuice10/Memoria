<script setup lang="ts">
import LocalizedLink from "@/shared/ui/LocalizedLink.vue";

defineProps<{
  to: string;
}>();
</script>

<template>
  <LocalizedLink :to="to">
    <slot/>
  </LocalizedLink>
</template>