<script setup lang="ts">
import {Footer} from "@/widgets/footer";
import {Button, SpacedRepetitionFeatureIcon, AIAssistanceIcon, TrustworthyAnswersFeatureIcon, StatisticsFeatureIcon, CheckIcon, StarIcon, ClockIcon, HourGlassIcon} from "@/shared/ui";
import {useRouter, useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const router = useRouter();
const route = useRoute();

function goToRegister() {
  router.push({name: "register", params: {locale: route.params.locale}});
}
</script>

<template>
  <div class="min-h-screen pt-page bg-primary">

    <!-- Hero -->
    <section class="px-page py-section bg-tertiary">
      <div class="flex flex-col md:flex-row justify-between items-center gap-15 flex-wrap">
        <div class="flex flex-col gap-8 w-full md:w-5/10">
          <span class="w-fit px-3 py-1 rounded-full text-base font-semibold border border-default bg-primary">
            {{ t("features.spacedRepetition.badge") }}
          </span>
          <h1 class="text-5xl font-bold leading-tight">
            {{ t("features.spacedRepetition.hero.headline") }}<br/>
            <span>{{ t("features.spacedRepetition.hero.headlineMuted") }}</span>
          </h1>
          <p class="text-lg leading-relaxed">{{ t("features.spacedRepetition.hero.subheadline") }}</p>
          <Button class="w-44 h-12 text-lg" @click="goToRegister">
            <span class="font-semibold">{{ t("features.spacedRepetition.hero.cta") }}</span>
          </Button>
        </div>

        <!-- Forgetting curve chart -->
        <div class="w-full md:w-4/10 flex justify-center">
          <div class="w-full max-w-md aspect-[4/3] rounded-2xl border border-default bg-primary p-6 flex flex-col gap-4">
            <span class="text-base font-semibold uppercase tracking-widest">{{ t("features.spacedRepetition.hero.chartLabel") }}</span>
            <svg viewBox="0 0 400 220" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="40" y1="10" x2="40" y2="190" stroke="currentColor" stroke-opacity="0.1" stroke-width="1"/>
              <line x1="40" y1="190" x2="390" y2="190" stroke="currentColor" stroke-opacity="0.1" stroke-width="1"/>
              <line x1="40" y1="50" x2="390" y2="50" stroke="currentColor" stroke-opacity="0.07" stroke-width="1" stroke-dasharray="4 4"/>
              <line x1="40" y1="100" x2="390" y2="100" stroke="currentColor" stroke-opacity="0.07" stroke-width="1" stroke-dasharray="4 4"/>
              <line x1="40" y1="150" x2="390" y2="150" stroke="currentColor" stroke-opacity="0.07" stroke-width="1" stroke-dasharray="4 4"/>
              <text x="30" y="54" text-anchor="end" font-size="10" fill="currentColor" opacity="0.4">100%</text>
              <text x="30" y="104" text-anchor="end" font-size="10" fill="currentColor" opacity="0.4">50%</text>
              <text x="30" y="154" text-anchor="end" font-size="10" fill="currentColor" opacity="0.4">25%</text>
              <text x="30" y="194" text-anchor="end" font-size="10" fill="currentColor" opacity="0.4">0%</text>
              <path d="M 40 50 C 100 50, 130 120, 160 155 C 190 175, 220 183, 390 188" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="6 3"/>
              <path d="M 40 50 L 100 130 L 100 55 L 180 120 L 180 58 L 270 110 L 270 60 L 370 95 L 370 62" stroke="var(--color-good, #4ade80)" stroke-width="2.5" stroke-linejoin="round"/>
              <circle cx="100" cy="55" r="5" fill="var(--color-good, #4ade80)"/>
              <circle cx="180" cy="58" r="5" fill="var(--color-good, #4ade80)"/>
              <circle cx="270" cy="60" r="5" fill="var(--color-good, #4ade80)"/>
              <circle cx="370" cy="62" r="5" fill="var(--color-good, #4ade80)"/>
              <line x1="50" y1="210" x2="80" y2="210" stroke="currentColor" stroke-opacity="0.3" stroke-width="2" stroke-dasharray="6 3"/>
              <text x="85" y="214" font-size="10" fill="currentColor" opacity="0.4">{{ t("features.spacedRepetition.hero.chartWithout") }}</text>
              <line x1="200" y1="210" x2="230" y2="210" stroke="var(--color-good, #4ade80)" stroke-width="2.5"/>
              <text x="235" y="214" font-size="10" fill="currentColor" opacity="0.6">{{ t("features.spacedRepetition.hero.chartWith") }}</text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="px-page py-section bg-primary">
      <div class="flex flex-col gap-16">
        <div class="flex flex-col gap-4 max-w-2xl">
          <h2 class="text-3xl font-bold">{{ t("features.spacedRepetition.howItWorks.heading") }}</h2>
          <p class="text-lg">{{ t("features.spacedRepetition.howItWorks.subheading") }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(step, i) in ['step1','step2','step3']" :key="step"
               class="flex flex-col gap-4 p-8 rounded-2xl border border-default bg-tertiary">
            <div class="w-12 h-12 rounded-xl border border-default flex items-center justify-center text-2xl font-bold">{{ i + 1 }}</div>
            <h3 class="text-xl font-semibold">{{ t(`features.spacedRepetition.howItWorks.${step}.title`) }}</h3>
            <p class="leading-relaxed">{{ t(`features.spacedRepetition.howItWorks.${step}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Rating scale -->
    <section class="px-page py-section bg-tertiary">
      <div class="flex flex-col md:flex-row justify-between items-center gap-15 flex-wrap">
        <div class="flex flex-col gap-8 w-full md:w-5/10">
          <h2 class="text-3xl font-bold">{{ t("features.spacedRepetition.ratings.heading") }}</h2>
          <p class="text-lg leading-relaxed">{{ t("features.spacedRepetition.ratings.subheading") }}</p>
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-4 p-4 rounded-xl border border-default bg-primary">
              <span class="w-20 text-center py-1 rounded-lg text-base font-bold" style="background: var(--color-again); color: #fff;">{{ t("actions.rating.again") }}</span>
              <span class="text-base">{{ t("features.spacedRepetition.ratings.again") }}</span>
            </div>
            <div class="flex items-center gap-4 p-4 rounded-xl border border-default bg-primary">
              <span class="w-20 text-center py-1 rounded-lg text-base font-bold" style="background: var(--color-bad); color: #1a1a1a;">{{ t("actions.rating.bad") }}</span>
              <span class="text-base">{{ t("features.spacedRepetition.ratings.bad") }}</span>
            </div>
            <div class="flex items-center gap-4 p-4 rounded-xl border border-default bg-primary">
              <span class="w-20 text-center py-1 rounded-lg text-base font-bold" style="background: var(--color-good); color: #1a1a1a;">{{ t("actions.rating.good") }}</span>
              <span class="text-base">{{ t("features.spacedRepetition.ratings.good") }}</span>
            </div>
            <div class="flex items-center gap-4 p-4 rounded-xl border border-default bg-primary">
              <span class="w-20 text-center py-1 rounded-lg text-base font-bold" style="background: var(--color-perfect); color: #fff;">{{ t("actions.rating.perfect") }}</span>
              <span class="text-base">{{ t("features.spacedRepetition.ratings.perfect") }}</span>
            </div>
          </div>
        </div>

        <!-- Interval growth chart -->
        <div class="w-full md:w-4/10 flex justify-center">
          <div class="w-full max-w-md rounded-2xl border border-default bg-primary p-6 flex flex-col gap-4">
            <span class="text-base font-semibold uppercase tracking-widest">{{ t("features.spacedRepetition.ratings.chartLabel") }}</span>
            <svg viewBox="0 0 360 200" class="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="20"  y="170" width="30" height="10"  rx="4" fill="var(--color-perfect)" opacity="0.8"/>
              <rect x="70"  y="155" width="30" height="25"  rx="4" fill="var(--color-perfect)" opacity="0.8"/>
              <rect x="120" y="130" width="30" height="50"  rx="4" fill="var(--color-perfect)" opacity="0.8"/>
              <rect x="170" y="100" width="30" height="80"  rx="4" fill="var(--color-perfect)" opacity="0.8"/>
              <rect x="220" y="60"  width="30" height="120" rx="4" fill="var(--color-perfect)" opacity="0.8"/>
              <rect x="270" y="20"  width="30" height="160" rx="4" fill="var(--color-perfect)" opacity="0.8"/>
              <text x="35"  y="192" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.4">1d</text>
              <text x="85"  y="192" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.4">3d</text>
              <text x="135" y="192" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.4">7d</text>
              <text x="185" y="192" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.4">14d</text>
              <text x="235" y="192" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.4">30d</text>
              <text x="285" y="192" text-anchor="middle" font-size="10" fill="currentColor" opacity="0.4">60d</text>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-page py-section bg-primary flex flex-col items-center gap-8 text-center">
      <h2 class="text-4xl font-bold max-w-xl">{{ t("features.spacedRepetition.cta.heading") }}</h2>
      <p class="text-lg max-w-lg">{{ t("features.spacedRepetition.cta.subheading") }}</p>
      <Button class="w-44 h-12 text-lg" @click="goToRegister">
        <span class="font-semibold">{{ t("features.spacedRepetition.cta.button") }}</span>
      </Button>
    </section>

  </div>
  <Footer class="bg-primary"/>
</template>
