<script setup lang="ts">
import {ref} from "vue";
import VisibilityToggle from "@/shared/ui/form/VisibilityToggle.vue";

defineOptions({
  inheritAttrs: false
});

const props = defineProps<{
  modelValue: string;
  type: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isTextVisible = ref(props.type !== "password");
</script>

<template>
  <div class="relative w-full">
    <input v-bind="$attrs" :type="isTextVisible ? 'text' : 'password'" :value="modelValue"
           class="w-full h-13 pl-2.5 pr-15 py-1.25 border rounded-lg border-default
                  hover:outline-3 hover:-outline-offset-1 hover:outline-active"
           @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    <VisibilityToggle v-if="type === 'password'" v-model:isHidden="isTextVisible"/>
  </div>
</template>