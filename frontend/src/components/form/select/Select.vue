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
  <!--
  Relative position shouldn't be defined on this container explicitly
  Instead, it should be defined by the consumer
  -->
  <div @mouseenter="isOpen = true" @mouseleave="isOpen = false" class="flex justify-center items-center w-full h-full">
    <div :class="['w-full px-2.5 py-1.25 border rounded-lg', isOpen ? 'border-border bg-hover' : 'border-transparent']"
         role="combobox" tabindex="0">
      <slot name="label"/>
    </div>
    <Transition name="dropdown">
      <div v-if="isOpen"
           class="absolute left-0 top-full flex flex-col divide-y divide-border w-full border rounded-b-lg border-border bg-primary overflow-hidden">
        <slot/>
      </div>
    </Transition>
  </div>
</template>