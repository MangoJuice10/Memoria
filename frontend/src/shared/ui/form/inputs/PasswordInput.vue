<script setup lang="ts">
import TextInput from "@/shared/ui/form/inputs/TextInput.vue";
import {ref} from "vue";
import VisibilityToggle from "../VisibilityToggle.vue";

defineOptions({
  inheritAttrs: false
});

const modelValue = defineModel<string>();

const isTextVisible = ref(false);
</script>

<template>
  <div class="relative w-full">
    <TextInput v-model="modelValue"
               v-bind="$attrs"
               :type="isTextVisible
                 ? 'text'
                 : 'password'"/>
    <VisibilityToggle v-model:isHidden="isTextVisible"/>
  </div>
</template>