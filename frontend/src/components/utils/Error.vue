<script setup lang="ts">
defineProps<{
  error: string | null;
}>();
</script>

<template>
<div class="font-semibold text-text-error">
  {{error ?? "&nbsp"}}
</div>
</template>

