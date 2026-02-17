<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Button from "@/components/form/Button.vue";

defineProps<{
  headlineKey: string;
  subheadlineKey: string;
  ctaKey: string;
  isReverse?: boolean;
}>();
const {t} = useI18n();
</script>

<template>
  <section class="flex justify-between items-center px-page py-section">
    <div class="flex justify-between items-center flex-wrap gap-y-15"
         :class="{'flex-row-reverse': isReverse}">
      <div class="flex flex-col justify-start items-start gap-10 w-full md:w-5/10">
        <h2 v-html="t(headlineKey)"/>
        <p v-html="t(subheadlineKey)"/>
        <Button class="w-37.5 h-11.5 text-lg">
          <span v-text="t(ctaKey)" class="font-semibold"/>
        </Button>
      </div>
      <div class="flex justify-center items-center w-full md:w-4/10">
        <div class="w-4/5 md:w-full">
          <slot/>
        </div>
      </div>
    </div>
  </section>
</template>

