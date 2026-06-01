<script setup lang="ts">
withDefaults(defineProps<{
  min?: number;
  max?: number;
  step?: number;
}>(), {
  min: 1,
  step: 1,
});

const modelValue = defineModel<number>({default: 1});
</script>

<template>
  <input v-model.number="modelValue"
         :min
         :max
         :step
         type="range"
         class="h-2 border rounded-full border-default
                bg-primary
                appearance-none cursor-pointer"/>
</template>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1rem;
  height: 1rem;
  border: 0.125rem solid var(--color-border-default);
  border-radius: 100%;
  background-color: var(--color-secondary);
}
</style>