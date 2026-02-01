<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Button from "@/components/form/Button.vue";
import hero from "@/assets/images/Hero.png";
const {t} = useI18n();
</script>

<template>
  <div class="flex justify-between items-center px-25 pt-30 py-10">
    <div class="flex flex-col justify-start items-start gap-9.25 max-w-187.5">
      <div v-html="t('landing.hero.headline')" class="text-5xl font-bold"/>
      <div v-html="t('landing.hero.subheadline')" class="text-xl"/>
      <Button class="w-37.5 h-11.5 text-lg">
        <span v-text="t('landing.hero.cta')" class="font-semibold"/>
      </Button>
    </div>
    <img :src="hero" class="w-106.25 aspect-square"/>
  </div>
</template>

