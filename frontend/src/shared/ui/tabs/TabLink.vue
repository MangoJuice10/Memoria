<script setup lang="ts">
import type {MenuItemView} from "@/shared/config";

defineProps<{
}>();
</script>

<template>
  <div class="cursor-pointer">
    <slot/>
  </div>
</template>