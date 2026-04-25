<script setup lang="ts">

withDefaults(defineProps<{
  isReverse?: boolean;
}>(), {
  isReverse: false,
});
</script>

<template>
  <section class="flex justify-between items-center px-page py-section">
    <div class="flex justify-between items-center flex-wrap gap-y-15"
         :class="{'flex-row-reverse': isReverse}">
      <div class="flex flex-col justify-start items-start gap-10 w-full md:w-5/10">
        <slot name="content"/>
      </div>
      <div class="flex justify-center items-center w-full md:w-4/10">
        <div class="w-4/5 md:w-full">
          <slot name="image"/>
        </div>
      </div>
    </div>
  </section>
</template>

