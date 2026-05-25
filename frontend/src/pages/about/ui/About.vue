<script setup lang="ts">
import {Footer} from "@/widgets/footer";
import {Button, SpacedRepetitionFeatureIcon, AIAssistanceIcon, TrustworthyAnswersFeatureIcon, StatisticsFeatureIcon, LogomarkIcon, LearningIcon, CheckIcon, FileIcon, ClockIcon} from "@/shared/ui";
import {useRouter, useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const router = useRouter();
const route = useRoute();

function goToRegister() {
  router.push({name: "register", params: {locale: route.params.locale}});
}

function goToFeature(name: string) {
  router.push({name, params: {locale: route.params.locale}});
}

const features = [
  {key: "spacedRepetition", route: "feature-spaced-repetition", icon: SpacedRepetitionFeatureIcon},
  {key: "aiAssistance", route: "feature-ai-assistance", icon: AIAssistanceIcon},
  {key: "trustworthy", route: "feature-trustworthy-answers", icon: TrustworthyAnswersFeatureIcon},
  {key: "statistics", route: "feature-statistics", icon: StatisticsFeatureIcon},
];

const techItems = [
  {key: "vue", icon: LogomarkIcon},
  {key: "nest", icon: FileIcon},
  {key: "postgres", icon: ClockIcon},
  {key: "qdrant", icon: CheckIcon},
  {key: "langchain", icon: AIAssistanceIcon},
  {key: "prisma", icon: FileIcon},
  {key: "tailwind", icon: LearningIcon},
  {key: "sm2", icon: SpacedRepetitionFeatureIcon},
];
</script>

<template>
  <div class="min-h-screen pt-page bg-primary">

    <!-- Hero -->
    <section class="px-page py-section bg-tertiary">
      <div class="flex flex-col md:flex-row justify-between items-center gap-15 flex-wrap">
        <div class="flex flex-col gap-8 w-full md:w-5/10">
          <span class="w-fit px-3 py-1 rounded-full text-sm font-semibold border border-default bg-primary">
            {{ t("about.badge") }}
          </span>
          <h1 class="text-5xl font-bold leading-tight">
            {{ t("about.hero.headline") }}<br/>
            <span class="text-muted">{{ t("about.hero.headlineMuted") }}</span>
          </h1>
          <p class="text-lg text-muted leading-relaxed">{{ t("about.hero.subheadline") }}</p>
          <Button class="w-44 h-12 text-lg" @click="goToRegister">
            <span class="font-semibold">{{ t("about.hero.cta") }}</span>
          </Button>
        </div>

        <!-- Stats -->
        <div class="w-full md:w-4/10 grid grid-cols-2 gap-4">
          <div v-for="stat in ['cards', 'decks', 'retention', 'languages']" :key="stat"
               class="flex flex-col gap-2 p-6 rounded-2xl border border-default bg-primary">
            <span class="text-3xl font-bold">{{ t(`about.stats.${stat}.value`) }}</span>
            <span class="text-sm text-muted">{{ t(`about.stats.${stat}.label`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="px-page py-section bg-primary">
      <div class="flex flex-col md:flex-row justify-between items-center gap-15 flex-wrap">
        <div class="flex flex-col gap-6 w-full md:w-5/10">
          <h2 class="text-3xl font-bold">{{ t("about.mission.heading") }}</h2>
          <p class="text-muted text-lg leading-relaxed">{{ t("about.mission.p1") }}</p>
          <p class="text-muted text-lg leading-relaxed">{{ t("about.mission.p2") }}</p>
        </div>
        <div class="w-full md:w-4/10 flex flex-col gap-4">
          <div v-for="value in ['science', 'trust', 'focus']" :key="value"
               class="flex items-start gap-5 p-6 rounded-2xl border border-default bg-tertiary">
            <div class="icon-dynamic w-10 h-10 flex-shrink-0">
              <SpacedRepetitionFeatureIcon v-if="value === 'science'"/>
              <TrustworthyAnswersFeatureIcon v-else-if="value === 'trust'"/>
              <AIAssistanceIcon v-else/>
            </div>
            <div class="flex flex-col gap-1">
              <span class="font-semibold">{{ t(`about.mission.values.${value}.title`) }}</span>
              <span class="text-muted text-sm leading-relaxed">{{ t(`about.mission.values.${value}.description`) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How Memoria works -->
    <section class="px-page py-section bg-tertiary">
      <div class="flex flex-col gap-16">
        <div class="flex flex-col gap-4 max-w-2xl">
          <h2 class="text-3xl font-bold">{{ t("about.howItWorks.heading") }}</h2>
          <p class="text-muted text-lg">{{ t("about.howItWorks.subheading") }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex flex-col gap-4 p-8 rounded-2xl border border-default bg-primary">
            <div class="icon-dynamic w-12 h-12"><FileIcon/></div>
            <h3 class="text-xl font-semibold">{{ t("about.howItWorks.steps.create.title") }}</h3>
            <p class="text-muted leading-relaxed">{{ t("about.howItWorks.steps.create.description") }}</p>
          </div>
          <div class="flex flex-col gap-4 p-8 rounded-2xl border border-default bg-primary">
            <div class="icon-dynamic w-12 h-12"><SpacedRepetitionFeatureIcon/></div>
            <h3 class="text-xl font-semibold">{{ t("about.howItWorks.steps.study.title") }}</h3>
            <p class="text-muted leading-relaxed">{{ t("about.howItWorks.steps.study.description") }}</p>
          </div>
          <div class="flex flex-col gap-4 p-8 rounded-2xl border border-default bg-primary">
            <div class="icon-dynamic w-12 h-12"><AIAssistanceIcon/></div>
            <h3 class="text-xl font-semibold">{{ t("about.howItWorks.steps.ask.title") }}</h3>
            <p class="text-muted leading-relaxed">{{ t("about.howItWorks.steps.ask.description") }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features overview -->
    <section class="px-page py-section bg-primary">
      <div class="flex flex-col gap-16">
        <div class="flex flex-col gap-4 max-w-2xl">
          <h2 class="text-3xl font-bold">{{ t("about.features.heading") }}</h2>
          <p class="text-muted text-lg">{{ t("about.features.subheading") }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button v-for="feature in features" :key="feature.key"
                  class="flex items-start gap-5 p-8 rounded-2xl border border-default bg-tertiary
                         text-left hover:bg-hover transition-colors"
                  @click="goToFeature(feature.route)">
            <div class="icon-dynamic w-12 h-12 flex-shrink-0">
              <component :is="feature.icon"/>
            </div>
            <div class="flex flex-col gap-2">
              <span class="font-semibold text-lg">{{ t(`about.features.items.${feature.key}.title`) }}</span>
              <span class="text-muted text-sm leading-relaxed">{{ t(`about.features.items.${feature.key}.description`) }}</span>
              <span class="text-sm font-semibold mt-1">{{ t("about.features.learnMore") }} →</span>
            </div>
          </button>
        </div>
      </div>
    </section>

    <!-- Tech stack -->
    <section class="px-page py-section bg-tertiary">
      <div class="flex flex-col gap-16">
        <div class="flex flex-col gap-4 max-w-2xl">
          <h2 class="text-3xl font-bold">{{ t("about.tech.heading") }}</h2>
          <p class="text-muted text-lg">{{ t("about.tech.subheading") }}</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="item in techItems" :key="item.key"
               class="flex flex-col items-center gap-3 p-6 rounded-2xl border border-default bg-primary">
            <div class="icon-dynamic w-10 h-10">
              <component :is="item.icon"/>
            </div>
            <span class="font-semibold text-sm text-center">{{ t(`about.tech.items.${item.key}.name`) }}</span>
            <span class="text-xs text-muted text-center">{{ t(`about.tech.items.${item.key}.role`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-page py-section bg-primary flex flex-col items-center gap-8 text-center">
      <h2 class="text-4xl font-bold max-w-xl">{{ t("about.cta.heading") }}</h2>
      <p class="text-muted text-lg max-w-lg">{{ t("about.cta.subheading") }}</p>
      <Button class="w-44 h-12 text-lg" @click="goToRegister">
        <span class="font-semibold">{{ t("about.cta.button") }}</span>
      </Button>
    </section>

  </div>
  <Footer class="bg-primary"/>
</template>
