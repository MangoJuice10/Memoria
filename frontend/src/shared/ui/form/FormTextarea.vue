<script setup lang="ts">
defineOptions({
  inheritAttrs: false
});

const modelValue = defineModel<string>();
</script>

<template>
  <textarea v-model="modelValue"
            v-bind="$attrs"
            class="w-full h-50 px-2.5 py-1.25 border rounded-lg border-default
                   bg-primary
                   hover:outline-3 hover:-outline-offset-1 hover:outline-active"/>
</template>