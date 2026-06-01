<script setup lang="ts" generic="T extends string | number">
import type {ErrorMessage} from "@/shared/model";
import type {ClassValue} from "vue";
import NumberInput from "./inputs/NumberInput.vue";
import TextInput from "./inputs/TextInput.vue";
import RangeInput from "./inputs/RangeInput.vue";
import PasswordInput from "./inputs/PasswordInput.vue";
import Textarea from "./Textarea.vue";
import FormFieldError from "./FormFieldError.vue";

export type BaseProps = {
  id: string;
  label: string;
  error?: ErrorMessage;
  touched?: boolean;
  inputClasses?: ClassValue;
}

export type ModelModifiers = {
  modelModifiers?: {
    number?: boolean;
  }
}

export type Props =
    (| BaseProps & {
      variant?: "text" | "password" | "textarea";
      placeholder?: string;
    } | BaseProps & {
      variant: "number" | "range";
      min?: number;
      max?: number;
      step?: number;
    }) & ModelModifiers;

withDefaults(defineProps<Props>(), {
  variant: "text",
  error: null,
  touched: false,
});

const modelValue = defineModel<T>();
</script>

<template>
  <label class="flex flex-col items-start justify-start gap-1.25 w-full
                cursor-pointer">
    <span class="font-semibold">
      {{ label }}
    </span>
    <TextInput v-if="variant === 'text' && typeof modelValue === 'string'"
               v-model="modelValue"
               :id
               :placeholder
               :class="inputClasses"/>
    <PasswordInput v-else-if="variant === 'password' && typeof modelValue === 'string'"
                   v-model="modelValue"
                   :id
                   :placeholder
                   :class="inputClasses"/>
    <NumberInput v-else-if="variant === 'number' && typeof modelValue === 'number'"
                 v-model.number="modelValue"
                 :id
                 :min
                 :max
                 :step
                 :class="inputClasses"/>
    <RangeInput v-else-if="variant === 'range' && typeof modelValue === 'number'"
                v-model.number="modelValue"
                :id
                :min
                :max
                :step
                :class="inputClasses"/>
    <Textarea v-else-if="variant === 'textarea' && typeof modelValue === 'string'"
              v-model="modelValue"
              :id
              :placeholder
              :class="inputClasses"/>
    <FormFieldError :error
                    :touched
                    class="text-xs"/>
  </label>
</template>