<script setup lang="ts" generic="T extends string | number">
import type {ErrorMessage} from "@/shared/model";
import {IconButton, MinusIcon, PlusIcon} from "@/shared/ui";
import {type ClassValue, ref} from "vue";
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
  optional?: boolean;
  formFieldClasses?: ClassValue;
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
      variant: "number" | "range" | "range-number";
      min?: number;
      max?: number;
      step?: number;
    }) & ModelModifiers;

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<Props>(), {
  variant: "text",
  error: null,
  touched: false,
  optional: false,
});

const modelValue = defineModel<T | undefined>();

let modelValueSnapshot: T | undefined;

const isEnabled = ref(true);

function toggle() {
  isEnabled.value = !isEnabled.value;
  if (!isEnabled.value) {
    modelValueSnapshot = modelValue.value;
    modelValue.value = undefined;
  } else {
    modelValue.value = modelValueSnapshot;
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-3">
      <label class="flex flex-col items-start justify-start gap-1.25
                w-fit
                font-semibold
                cursor-pointer">
        {{ label }}
      </label>
      <div v-if="optional"
           class="flex justify-center items-center">
        <IconButton v-if="isEnabled"
                    :size-rem="1.5"
                    has-ring
                    :ring-margin-percent="10"
                    @click="toggle">
          <MinusIcon/>
        </IconButton>
        <IconButton v-else
                    :size-rem="1.5"
                    has-ring
                    :ring-margin-percent="10"
                    @click="toggle">
          <PlusIcon/>
        </IconButton>
      </div>
    </div>
    <div v-if="isEnabled">
      <TextInput v-if="variant === 'text'"
                 v-model="modelValue"
                 v-bind="$attrs"
                 :id
                 :placeholder/>
      <PasswordInput v-else-if="variant === 'password'"
                     v-model="modelValue"
                     v-bind="$attrs"
                     :id
                     :placeholder/>
      <NumberInput v-else-if="variant === 'number'"
                   v-model.number="modelValue"
                   v-bind="$attrs"
                   :id
                   :min
                   :max
                   :step/>
      <RangeInput v-else-if="variant === 'range'"
                  v-model.number="modelValue"
                  v-bind="$attrs"
                  :id
                  :min
                  :max
                  :step/>
      <div v-else-if="variant === 'range-number'"
           class="flex items-center gap-5">
        <RangeInput v-model.number="modelValue"
                    v-bind="$attrs"
                    :id
                    :min
                    :max
                    :step
                    class="grow"/>
        <NumberInput v-model.number="modelValue"
                     v-bind="$attrs"
                     :id
                     :min
                     :max
                     :step/>
      </div>
      <Textarea v-else-if="variant === 'textarea'"
                v-model="modelValue"
                v-bind="$attrs"
                :id
                :placeholder/>
    </div>
    <FormFieldError :error
                    :touched
                    class="text-xs"/>
  </div>
</template>