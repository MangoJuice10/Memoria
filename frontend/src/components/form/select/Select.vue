<script setup lang="ts">
import {ref, provide} from "vue";

/*
"defineModel()" is syntactic sugar that helps to avoid writing boilerplate code
for handling two-way binding.
*/
const selectedValue = defineModel();
/*
To achieve the same result as "defineModel()", you would need to write a bunch of code:
const props = defineProps<{ modelValue: string; }>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
const selectedValue = ref(props.modelValue);
watch(selectedValue, (value: string) => emit("update:modelValue", value));
*/

const isOpen = ref(false);
const selectValue = (value: string) => {
  selectedValue.value = value;
  isOpen.value = false;
};
provide("select", {
  selectValue
});

</script>

<template>
  <div @click="isOpen = !isOpen" @mouseenter="isOpen = true" @mouseleave="isOpen = false"
       class="relative h-full cursor-pointer">
    <div class="flex justify-center items-center w-full h-full">
      <div class="px-2.5 py-1.25 border rounded-lg border-transparent
      hover:border-default hover:bg-hover"
           role="combobox" tabindex="0">
        <slot name="label"/>
      </div>
    </div>
    <Transition name="dropdown">
      <div v-if="isOpen"
           class="flex flex-col divide-y divide-(--color-border) absolute left-0 top-full min-w-fit w-full overflow-hidden border rounded-b-lg border-default bg-primary">
        <slot/>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px) scaleY(0);
}

.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

.dropdown-enter-active {
  transition: opacity 200ms ease, transform 200ms ease;
  transform-origin: top;
}

.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scaleY(0);
}

.dropdown-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
  transform-origin: top;
}
</style>