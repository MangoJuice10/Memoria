<script setup lang="ts">
import {ref} from "vue";
import VisibilityToggle from "./VisibilityToggle.vue";

defineOptions({
  inheritAttrs: false
});

const props = defineProps<{
  type: string;
}>();

const modelValue = defineModel<string>();

const isTextVisible = ref(props.type !== "password");
</script>

<template>
  <div class="relative w-full">
    <input v-model="modelValue"
           v-bind="$attrs"
           :type="isTextVisible
                 ? 'text'
                 : 'password'"
           class="w-full h-13 pl-2.5 pr-15 py-1.25 border rounded-lg border-default
                  bg-primary
                  hover:outline-3 hover:-outline-offset-1 hover:outline-active">
    <VisibilityToggle v-if="type === 'password'"
                      v-model:isHidden="isTextVisible"/>
  </div>
</template>