<script setup lang="ts">
import Hero from "@/components/landing/Hero.vue";
import Feature from "@/components/landing/Feature.vue";
import Footer from "@/components/footer/Footer.vue";
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
  <div>
    <Hero class="bg-tertiary"/>
    <Feature v-for="feature in features" :headlineKey="feature.headlineKey" :subheadlineKey="feature.subheadlineKey"
             :ctaKey="feature.ctaKey" :isReverse="feature.isReverse" :class="feature.bgClass ?? ''">
      <img :src="feature.imageSrc" class="w-106.25"/>
    </Feature>
    <SharedDecksPreview class="bg-tertiary"/>
    <Footer class="bg-primary"/>
  </div>
</template>

