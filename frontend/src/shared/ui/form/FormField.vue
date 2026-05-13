<script setup lang="ts">
import type {ErrorMessage} from "@/shared/model";
import FormInput from "./FormInput.vue";
import FormTextarea from "./FormTextarea.vue";
import FormFieldError from "./FormFieldError.vue";

type BaseProps = {
  id: string;
  label: string;
  error?: ErrorMessage;
  touched?: boolean;
}

type Props = (BaseProps & {
  element?: "input",
  type?: string;
}) | (BaseProps & {
  element: "textarea";
});

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<Props>(), {
  element: "input",
  type: "text",
  error: null,
  touched: false,
});

const modelValue = defineModel<string>();
</script>

<template>
  <div class="flex flex-col items-start justify-start gap-1.25 w-full">
    <label v-text="label" :for="id" class="font-semibold"/>
    <FormInput v-if="element === 'input'"
               v-model="modelValue"
               v-bind="$attrs"
               :type="type"
               :data-testid="id"/>
    <FormTextarea v-else
                  v-model="modelValue"
                  v-bind="$attrs"
                  :data-testid="id"/>
    <FormFieldError :error
               :touched
               :data-testid="`${id}-validation-error`"/>
  </div>
</template>