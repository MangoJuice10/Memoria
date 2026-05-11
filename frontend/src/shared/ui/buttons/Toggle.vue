<script setup lang="ts">
import {ref} from "vue";

const emit = defineEmits<{
  on: [],
  off: []
}>();

const isOn = ref(false);
const toggle = () => {
  if (isOn.value) {
    emit("off");
    isOn.value = false;
    return;
  }
  emit("on");
  isOn.value = true;
};
</script>

<template>
  <button class="toggle overflow-hidden border border-default rounded-4xl
              cursor-pointer select-none"
       @click="toggle">
    <span class="flex justify-center items-center px-3 py-1"
         :class="isOn ? 'bg-secondary text-inverse' : 'bg-primary'">
      <slot name="off"/>
    </span>
    <span class="flex justify-center items-center px-3 py-1"
         :class="isOn ? 'bg-primary' : 'bg-secondary text-inverse'">
      <slot name="on"/>
    </span>
  </button>
</template>

<style scoped>
.toggle {
  display: grid;
  grid-template-columns: repeat(2, minmax(min-content, 1fr));
}
</style>