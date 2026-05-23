<script setup lang="ts">
import type {ErrorMessage} from "@/shared/model";

defineProps<{
  error: ErrorMessage,
  touched: boolean,
}>();

// Due to Zod returning default error messages for any falsy values returned by the error() function,
// " " is returned for the rules where there should be no error message, so it is necessary to trim the error.
</script>

<template>
  <div class="text-error font-semibold">
    <div v-if="error !== null && error.trim() && touched" v-text="error"/>
    <div v-else>&nbsp</div>
  </div>
</template>