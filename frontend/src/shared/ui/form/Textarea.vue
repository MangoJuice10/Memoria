<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});

const modelValue = defineModel<string>();
</script>

<template>
  <textarea v-model="modelValue"
            v-bind="$attrs"
            v-auto-resize
            class="w-full min-h-50 max-h-130 px-2.5 py-1.25 border rounded-lg border-default
                   bg-primary
                   hover:outline-3 hover:-outline-offset-1 hover:outline-active"/>
</template>