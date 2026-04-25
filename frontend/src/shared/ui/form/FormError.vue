<script setup lang="ts">
import type {ErrorMessage} from "@/shared/types";

defineProps<{
  error: ErrorMessage,
  touched: boolean,
}>();

</script>

<template>
  <div class="text-xs text-error font-semibold">
    <div v-if="error !== null && touched" v-text="error"/>
    <div v-else>&nbsp</div>
  </div>
</template>