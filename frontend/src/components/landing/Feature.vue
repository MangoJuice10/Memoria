<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Button from "@/components/form/Button.vue";
const props = defineProps<{
  headlineKey: string;
  subheadlineKey: string;
  ctaKey: string;
  isReverse?: boolean;
}>();
const {t} = useI18n();
</script>

<template>
<div class="flex justify-between items-center h-120 px-25 py-10"
:class="{'flex-row-reverse': isReverse}">
  <slot/>
  <div class="flex flex-col justify-start items-start gap-9.25 max-w-175">
    <div v-html="t(headlineKey)" class="text-4xl font-semibold"/>
    <div v-html="t(subheadlineKey)" class="text-xl"></div>
    <Button class="w-37.5 h-11.5 text-lg">
      <span v-text="t(ctaKey)" class="font-semibold"/>
    </Button>
  </div>
</div>
</template>

