<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  min?: number;
  max?: number;
  step?: number;
}>(), {
  min: 1,
  step: 1,
});

const modelValue = defineModel<number>({default: 1});

const canDecrement = computed(() =>
    props.min === undefined || modelValue.value > props.min
);

const canIncrement = computed(() =>
    props.max === undefined || modelValue.value < props.max
);

const decrement = () => {
  if (!canDecrement.value) return;
  modelValue.value = modelValue.value - props.step;
};

const increment = () => {
  if (!canIncrement.value) return;
  modelValue.value = modelValue.value + props.step;
};

const onInput = (e: Event) => {
  const raw = Number((e.target as HTMLInputElement).value);
  if (isNaN(raw)) return;
  modelValue.value = Math.min(
      props.max ?? Infinity,
      Math.max(raw, props.min ?? -Infinity)
  );
  ;
};
</script>

<template>
  <div class="flex items-center
              border border-default rounded-lg overflow-hidden
              bg-primary">
    <button type="button"
            :disabled="!canDecrement"
            class="flex items-center justify-center
                     w-10 h-10
                     text-lg font-semibold
                     transition-colors duration-150
                     enabled:hover:text-inverse enabled:hover:bg-secondary
                     disabled:text-disabled disabled:bg-disabled disabled:cursor-not-allowed"
            @click="decrement">
      −
    </button>
    <input type="number"
           :value="modelValue"
           :min="min"
           :max="max"
           :step="step ?? 1"
           class="w-12 h-10
                  text-sm font-semibold text-center
                  border-x border-default
                  bg-transparent
                  appearance-none
                  focus:outline-none"
           @input="onInput"/>
    <button type="button"
            :disabled="!canIncrement"
            class="w-10 h-10 flex items-center justify-center
                   text-lg font-semibold
                   transition-colors duration-150
                   enabled:hover:text-inverse enabled:hover:bg-secondary
                   disabled:text-disabled disabled:bg-disabled disabled:cursor-not-allowed"
            @click="increment">
      +
    </button>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button {
  display: none;
}
</style>