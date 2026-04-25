<script setup lang="ts">
import type {ErrorMessage} from "@/shared/types";

defineProps<{
  error: ErrorMessage;
}>();
</script>

<template>
<div class="font-semibold text-center text-error">
  {{error ?? "&nbsp"}}
</div>
</template>