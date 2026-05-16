<script setup lang="ts">
const isOn = defineModel<boolean>("isOn", {default: false});

const toggle = () => {
  isOn.value = !isOn.value;
}
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