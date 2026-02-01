<script setup lang="ts">
import type {ValidationError} from "@/types/ValidationError";

defineProps<{
  error: ValidationError,
  touched: boolean,
}>();
</script>

<template>
  <div class="text-xs text-text-error font-semibold">
    <div v-if="error !== null && touched" v-text="error"/>
    <div v-else>&nbsp</div>
  </div>
</template>