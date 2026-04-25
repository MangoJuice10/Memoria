<script setup lang="ts">
import Hero from "@/pages/landing/ui/Hero.vue";
import Feature from "@/pages/landing/ui/Feature.vue";
import {Footer} from "@/widgets/footer";
import {Button} from "@/shared/ui";
import spacedRepetition from "@/assets/images/SpacedRepetition.png";
import AIAssistance from "@/assets/images/AIAssistance.png";
import trustworthyAnswers from "@/assets/images/TrustworthyAnswers.png";

</script>
<template>
  <div class="grid auto-rows-[minmax(min-content,1fr)] w- pt-page">
    <Hero class="bg-tertiary"/>
    <Feature :isReverse="true" class="bg-primary">
      <template #content>
        <h2>{{ $t("landing.spacedRepetition.headline") }}</h2>
        <i18n-t keypath="landing.spacedRepetition.subheadline.content" tag="p" scope="global">
          <template #spaced-repetition>
            <b>{{ $t("landing.spacedRepetition.subheadline.spacedRepetition") }}</b>
          </template>
          <template #flashcards>
            <b>{{ $t("landing.spacedRepetition.subheadline.flashcards") }}</b>
          </template>
          <template #decks>
            <b>{{ $t("landing.spacedRepetition.subheadline.decks") }}</b>
          </template>
          <template #shared-decks>
            <b>{{ $t("landing.spacedRepetition.subheadline.sharedDecks") }}</b>
          </template>
        </i18n-t>
        <Button class="w-37.5 h-11.5 text-lg">
          <span class="font-semibold">{{ $t("landing.spacedRepetition.cta") }}</span>
        </Button>
      </template>
      <template #image>
        <img :src="spacedRepetition" alt="" class="w-full h-full">
      </template>
    </Feature>
    <Feature class="bg-tertiary">
      <template #content>
        <h2>{{ $t("landing.AIAssistance.headline") }}</h2>
        <i18n-t keypath="landing.AIAssistance.subheadline.content" tag="p" scope="global">
          <template #immediately>
            <b>{{ $t("landing.AIAssistance.subheadline.immediately") }}</b>
          </template>
          <template #understanding>
            <b>{{ $t("landing.AIAssistance.subheadline.understanding") }}</b>
          </template>
        </i18n-t>
        <Button class="w-37.5 h-11.5 text-lg">
          <span class="font-semibold">{{ $t("landing.AIAssistance.cta") }}</span>
        </Button>
      </template>
      <template #image>
        <img :src="AIAssistance" alt="" class="w-full h-full">
      </template>
    </Feature>
    <Feature :isReverse="true" class="bg-primary">
      <template #content>
        <h2>{{ $t("landing.trustworthyAnswers.headline") }}</h2>
        <i18n-t keypath="landing.trustworthyAnswers.subheadline.content" tag="p" scope="global">
          <template #accuracy>
            <b>{{ $t("landing.trustworthyAnswers.subheadline.accuracy") }}</b>
          </template>
          <template #hallucinations>
            <b>{{ $t("landing.trustworthyAnswers.subheadline.hallucinations") }}</b>
          </template>
        </i18n-t>
        <Button class="w-37.5 h-11.5 text-lg">
          <span class="font-semibold">{{ $t("landing.trustworthyAnswers.cta") }}</span>
        </Button>
      </template>
      <template #image>
        <img :src="trustworthyAnswers" alt="" class="w-full h-full">
      </template>
    </Feature>
  </div>
  <Footer class="bg-primary"/>
</template>