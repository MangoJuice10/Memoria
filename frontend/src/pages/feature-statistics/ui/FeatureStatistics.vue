<script setup lang="ts">
import {Footer} from "@/widgets/footer";
import {Button, SpacedRepetitionFeatureIcon, StatisticsFeatureIcon, ClockIcon, CheckIcon, StarIcon, HourGlassIcon, AIAssistanceIcon} from "@/shared/ui";
import {useRouter, useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
const router = useRouter();
const route = useRoute();

function goToRegister() {
  router.push({name: "register", params: {locale: route.params.locale}});
}

const activityData = [0.1,0.3,0.6,0.2,0.8,0.4,0.1,0.5,0.7,0.3,0.9,0.6,0.2,0.4,0.3,0.8,0.5,0.7,0.4,0.9,0.6,0.2,0.4,0.8,0.3,0.7,0.5,0.9,0.6,0.3,0.9,0.5,0.8,0.4,0.7,0.4,0.7,0.2,0.9,0.6,0.3,0.8,0.8,0.5,0.7,0.4,0.9,0.6,0.3];
</script>

<template>
  <div class="min-h-screen pt-page bg-primary">

    <!-- Hero -->
    <section class="px-page py-section bg-tertiary">
      <div class="flex flex-col md:flex-row justify-between items-center gap-15 flex-wrap">
        <div class="flex flex-col gap-8 w-full md:w-5/10">
          <span class="w-fit px-3 py-1 rounded-full text-sm font-semibold border border-default bg-primary">
            {{ t("features.statistics.badge") }}
          </span>
          <h1 class="text-5xl font-bold leading-tight">
            {{ t("features.statistics.hero.headline") }}<br/>
            <span class="text-muted">{{ t("features.statistics.hero.headlineMuted") }}</span>
          </h1>
          <p class="text-lg text-muted leading-relaxed">{{ t("features.statistics.hero.subheadline") }}</p>
          <Button class="w-44 h-12 text-lg" @click="goToRegister">
            <span class="font-semibold">{{ t("features.statistics.hero.cta") }}</span>
          </Button>
        </div>

        <!-- Mock dashboard -->
        <div class="w-full md:w-4/10 flex justify-center">
          <div class="w-full max-w-md rounded-2xl border border-default bg-primary p-6 flex flex-col gap-5">
            <span class="text-sm font-semibold text-muted uppercase tracking-widest">{{ t("features.statistics.hero.dashboardLabel") }}</span>
            <div class="grid grid-cols-3 gap-3">
              <div class="flex flex-col gap-1 p-3 rounded-xl border border-default bg-tertiary">
                <span class="text-2xl font-bold">247</span>
                <span class="text-xs text-muted">{{ t("features.statistics.hero.cardsReviewed") }}</span>
              </div>
              <div class="flex flex-col gap-1 p-3 rounded-xl border border-default bg-tertiary">
                <span class="text-2xl font-bold">84%</span>
                <span class="text-xs text-muted">{{ t("features.statistics.hero.retentionRate") }}</span>
              </div>
              <div class="flex flex-col gap-1 p-3 rounded-xl border border-default bg-tertiary">
                <span class="text-2xl font-bold">12</span>
                <span class="text-xs text-muted">{{ t("features.statistics.hero.dayStreak") }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-xs text-muted">{{ t("features.statistics.hero.activityLabel") }}</span>
              <div class="grid gap-1" style="grid-template-columns: repeat(7, 1fr)">
                <div v-for="(intensity, i) in activityData" :key="i"
                     class="aspect-square rounded-sm"
                     :style="`background: var(--color-good); opacity: ${intensity}`"/>
              </div>
              <div class="flex justify-between text-xs text-muted">
                <span>{{ t("features.statistics.hero.less") }}</span>
                <span>{{ t("features.statistics.hero.more") }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-xs text-muted">{{ t("features.statistics.hero.retentionByDeck") }}</span>
              <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                  <span class="text-xs text-muted w-24 truncate">Biology</span>
                  <div class="flex-1 h-2 rounded-full bg-tertiary overflow-hidden border border-default">
                    <div class="h-full rounded-full" style="width: 91%; background: var(--color-good)"></div>
                  </div>
                  <span class="text-xs text-muted w-8 text-right">91%</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-xs text-muted w-24 truncate">History</span>
                  <div class="flex-1 h-2 rounded-full bg-tertiary overflow-hidden border border-default">
                    <div class="h-full rounded-full" style="width: 74%; background: var(--color-bad)"></div>
                  </div>
                  <span class="text-xs text-muted w-8 text-right">74%</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-xs text-muted w-24 truncate">Mathematics</span>
                  <div class="flex-1 h-2 rounded-full bg-tertiary overflow-hidden border border-default">
                    <div class="h-full rounded-full" style="width: 58%; background: var(--color-again)"></div>
                  </div>
                  <span class="text-xs text-muted w-8 text-right">58%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Planned features -->
    <section class="px-page py-section bg-primary">
      <div class="flex flex-col gap-16">
        <div class="flex flex-col gap-4 max-w-2xl">
          <h2 class="text-3xl font-bold">{{ t("features.statistics.planned.heading") }}</h2>
          <p class="text-muted text-lg">{{ t("features.statistics.planned.subheading") }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="key in ['retention','streaks','weak','forecast','time','distribution']" :key="key"
               class="flex flex-col gap-4 p-8 rounded-2xl border border-default bg-tertiary">
            <div class="icon-dynamic w-10 h-10">
              <StatisticsFeatureIcon v-if="key === 'retention'"/>
              <StarIcon v-else-if="key === 'streaks'"/>
              <CheckIcon v-else-if="key === 'weak'"/>
              <ClockIcon v-else-if="key === 'forecast'"/>
              <HourGlassIcon v-else-if="key === 'time'"/>
              <AIAssistanceIcon v-else/>
            </div>
            <h3 class="text-xl font-semibold">{{ t(`features.statistics.planned.${key}.title`) }}</h3>
            <p class="text-muted leading-relaxed">{{ t(`features.statistics.planned.${key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-page py-section bg-tertiary flex flex-col items-center gap-8 text-center">
      <h2 class="text-4xl font-bold max-w-xl">{{ t("features.statistics.cta.heading") }}</h2>
      <p class="text-muted text-lg max-w-lg">{{ t("features.statistics.cta.subheading") }}</p>
      <Button class="w-44 h-12 text-lg" @click="goToRegister">
        <span class="font-semibold">{{ t("features.statistics.cta.button") }}</span>
      </Button>
    </section>

  </div>
  <Footer class="bg-primary"/>
</template>
