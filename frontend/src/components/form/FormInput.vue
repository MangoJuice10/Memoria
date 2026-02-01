<script setup lang="ts">
import {ref, computed} from "vue";
import type {ValidationError} from "@/types/ValidationError";
import FormError from "@/components/form/FormError.vue";
import VisibilityToggle from "@/components/form/VisibilityToggle.vue";

const props = withDefaults(defineProps<{
  id: string,
  label: string,
  type?: string,
  placeholder?: string,
  modelValue: string,
} & ({
  error: ValidationError;
  touched: boolean;
} | {
  error?: never;
  touched?: never;
})>(), {
  type: "text",
  error: null,
  touched: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "input"): void;
  (e: "blur"): void;
}>();

const isTextVisible = ref(props.type !== "password");
const newInputType = computed(() => isTextVisible.value ? "text" : "password");

function handleInput(e: Event) {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
  emit("input");
}

function handleBlur() {
  emit("blur");
}
</script>

<template>
  <div class="flex flex-col items-start justify-start gap-1.25 w-full">
    <label v-text="label" :for="id" class="font-semibold"/>
    <div class="relative w-full">
      <input :type="newInputType" :id="id" class="w-full h-13 pl-2.5 pr-15 py-1.25 border rounded-lg border-border"
             :value="modelValue"
             :placeholder="placeholder"
             @input="handleInput"
             @blur="handleBlur">
      <VisibilityToggle v-if="type === 'password'" v-model:isVisible="isTextVisible" class="w-8"/>
    </div>
    <FormError :error :touched/>
  </div>
</template>