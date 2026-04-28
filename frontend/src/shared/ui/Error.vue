<script setup lang="ts">
import type {ErrorMessage} from "@/shared/model";

defineProps<{
  error: ErrorMessage;
}>();
</script>

<template>
<div class="font-semibold text-center text-error">
  {{error ?? "&nbsp"}}
</div>
</template>