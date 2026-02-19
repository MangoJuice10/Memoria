<script setup lang="ts">
import MainLayout from "@/components/layouts/MainLayout.vue";
import Hero from "@/components/landing/Hero.vue";
import Feature from "@/components/landing/Feature.vue";
import Footer from "@/components/footer/Footer.vue";
import Resizable from "@/components/utils/Resizable.vue";
import SharedDecksPreview from "@/components/landing/SharedDecksPreview.vue";
import spacedRepetition from "@/assets/images/SpacedRepetition.png";
import AIAssistance from "@/assets/images/AIAssistance.png";
import trustworthyAnswers from "@/assets/images/TrustworthyAnswers.png";

const features: {
  key: string;
  headlineKey: string;
  subheadlineKey: string;
  ctaKey: string;
  imageSrc: string;
  isReverse?: true;
  bgClass?: string;
}[] = [
  {
    key: "spacedRepetition",
    headlineKey: "landing.spacedRepetition.headline",
    subheadlineKey: "landing.spacedRepetition.subheadline",
    ctaKey: "landing.spacedRepetition.cta",
    imageSrc: spacedRepetition,
    isReverse: true,
    bgClass: "bg-primary"
  },
  {
    key: "AIAssistance",
    headlineKey: "landing.AIAssistance.headline",
    subheadlineKey: "landing.AIAssistance.subheadline",
    ctaKey: "landing.AIAssistance.cta",
    imageSrc: AIAssistance,
    bgClass: "bg-tertiary"
  },
  {
    key: "trustworthyAnswers",
    headlineKey: "landing.trustworthyAnswers.headline",
    subheadlineKey: "landing.trustworthyAnswers.subheadline",
    ctaKey: "landing.trustworthyAnswers.cta",
    imageSrc: trustworthyAnswers,
    isReverse: true,
    bgClass: "bg-primary"
  }
];

</script>
<template>
  <MainLayout>
    <!--
    "auto-rows-[minmax(min-content,1fr)]" ensures that all the elements have at least the height
    of the element with the greatest height, as well as prevents all the elements from shrinking
    below their min heights.N
    -->
    <div class="grid auto-rows-[minmax(min-content,1fr)] pt-page">
      <Hero class="bg-tertiary"/>
      <Feature v-for="feature in features" :headlineKey="feature.headlineKey" :subheadlineKey="feature.subheadlineKey"
               :ctaKey="feature.ctaKey" :isReverse="feature.isReverse" :class="feature.bgClass ?? ''">
        <img :src="feature.imageSrc" alt="" class="w-full h-full"/>
      </Feature>
    </div>
    <SharedDecksPreview class="bg-tertiary"/>
    <div class="flex justify-center">
      <Resizable has-top-resize-handle has-right-resize-handle has-bottom-resize-handle has-left-resize-handle>
        <div class="bg-red-500">
          1 2 3 4 5
          <br>
          6 7 8 9 10
          <br>
          11 12 13 14 15
        </div>
      </Resizable>
    </div>
    <Footer class="bg-primary"/>
  </MainLayout>
</template>