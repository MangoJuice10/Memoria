<script setup lang="ts">
const isOn = defineModel<boolean>("isOn", {default: false});

const toggle = () => {
  isOn.value = !isOn.value;
};
</script>

<template>
  <button class="overflow-hidden border border-default rounded-xl
                 shadow-[0px_4px_0px_0px_var(--color-secondary),0px_5px_0px_0px_var(--color-border-default)] cursor-pointer select-none"
          @click="toggle">
    <div class="group/toggle
                toggle
                h-full">
      <div class="flex justify-center items-center px-3 py-1"
           :class="isOn ? 'bg-secondary text-inverse'
                         : 'bg-primary group-hover/toggle:bg-hover group-hover/hover:text-inverse'">
        <slot name="off"/>
      </div>
      <div class="flex justify-center items-center px-3 py-1"
           :class="isOn ? 'bg-primary group-hover/toggle:bg-hover group-hover/toggle:text-inverse'
                         : 'bg-secondary text-inverse'">
        <slot name="on"/>
      </div>
    </div>
  </button>
</template>

<style scoped>
.toggle {
  display: grid;
  grid-template-columns: repeat(2, minmax(min-content, 1fr));
}
</style>