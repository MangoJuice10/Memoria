<script setup lang="ts">
import {inject} from "vue";

defineProps<{
  optionValue: string;
}>();

const select = inject<{
  selectValue: (value: string) => void;
}>("select");

if (!select) throw new Error("Select option must be used inside select!");
</script>

<template>
  <div @click="select.selectValue(optionValue)" class="p-2.5 hover:bg-hover cursor-pointer"
       role="option">
    <slot/>
  </div>
</template>