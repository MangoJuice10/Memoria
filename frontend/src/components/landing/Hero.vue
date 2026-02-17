<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Button from "@/components/form/Button.vue";
import hero from "@/assets/images/Hero.png";
import IconLabel from "@/components/utils/IconLabel.vue";
import SpacedRepetitionFeatureIcon from "@/components/icons/spacedRepetition/SpacedRepetitionFeatureIcon.vue";

const {t} = useI18n();
</script>

<template>
  <section class="flex justify-between items-center px-page py-section">
    <div class="flex justify-between items-center flex-wrap gap-y-15">
      <div class="flex flex-col justify-start items-start gap-10 w-full md:w-5/10">
        <h1 v-html="t('landing.hero.headline')"/>
        <p v-html="t('landing.hero.subheadline')"/>
        <Button class="w-37.5 h-11.5 text-lg">
          <span v-text="t('landing.hero.cta')"/>
        </Button>
      </div>
      <div class="flex justify-center items-center w-full md:w-4/10">
        <img :src="hero" alt="" class="w-4/5 md:w-full"/>
      </div>
    </div>
  </section>
</template>