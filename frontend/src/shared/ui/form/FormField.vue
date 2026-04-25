<script setup lang="ts">
import type {ErrorMessage} from "@/shared/types/ErrorMessage.ts";
import FormError from "@/shared/ui/form/FormError.vue";
import {FormInput} from "@/shared/ui";

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<{
  id: string;
  label: string;
  modelValue: string;
  type?: string;
  error?: ErrorMessage;
  touched?: boolean;
}>(), {
  type: "text",
  error: null,
  touched: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <div class="flex flex-col items-start justify-start gap-1.25 w-full">
    <label v-text="label" :for="id" class="font-semibold"/>
    <FormInput
        :type="type"
        :model-value="modelValue"
        v-bind="$attrs"
        @update:modelValue="emit('update:modelValue', $event)"
        :data-testid="id"/>
    <FormError :error :touched :data-testid="`${id}-validation-error`"/>
  </div>
</template>