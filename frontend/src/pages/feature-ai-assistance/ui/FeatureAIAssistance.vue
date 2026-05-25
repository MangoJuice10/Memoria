<script setup lang="ts">
import {Footer} from "@/widgets/footer";
import {Button, SpacedRepetitionFeatureIcon, AIAssistanceIcon, TrustworthyAnswersFeatureIcon, StatisticsFeatureIcon, FileIcon, ClockIcon, CheckIcon, StarIcon} from "@/shared/ui";
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
          <span class="w-fit px-3 py-1 rounded-full text-sm font-semibold border border-default bg-primary">
            {{ t("features.aiAssistance.badge") }}
          </span>
          <h1 class="text-5xl font-bold leading-tight">
            {{ t("features.aiAssistance.hero.headline") }}<br/>
            <span>{{ t("features.aiAssistance.hero.headlineMuted") }}</span>
          </h1>
          <p class="text-lg leading-relaxed">
            {{ t("features.aiAssistance.hero.subheadline") }}
          </p>
          <Button class="w-44 h-12 text-lg" @click="goToRegister">
            <span class="font-semibold">{{ t("features.aiAssistance.hero.cta") }}</span>
          </Button>
        </div>

        <!-- Mock chat UI -->
        <div class="w-full md:w-4/10 flex justify-center">
          <div class="w-full max-w-sm rounded-2xl border border-default bg-primary overflow-hidden flex flex-col">
            <div class="px-5 py-3 border-b border-default flex items-center gap-3">
              <div class="w-8 h-8 rounded-full border border-default flex items-center justify-center text-xs font-bold">AI</div>
              <span class="font-semibold text-sm">Memoria Assistant</span>
              <span class="ml-auto w-2 h-2 rounded-full bg-green-400"></span>
            </div>
            <div class="flex flex-col gap-4 p-5">
              <div class="flex flex-row-reverse gap-3 items-end">
                <div class="w-7 h-7 rounded-full border border-default flex-shrink-0 bg-tertiary"></div>
                <div class="px-4 py-2 rounded-2xl rounded-br-sm border border-default bg-tertiary text-sm max-w-[80%]">
                  What is the difference between RAM and ROM?
                </div>
              </div>
              <div class="flex gap-3 items-end">
                <div class="w-7 h-7 rounded-full border border-default flex-shrink-0 flex items-center justify-center text-xs font-bold">AI</div>
                <div class="px-4 py-2 rounded-2xl rounded-bl-sm border border-default bg-tertiary text-sm max-w-[80%] leading-relaxed">
                  <b>RAM</b> is volatile — stores data temporarily while on.
                  <b>ROM</b> is non-volatile and retains data when powered off.
                </div>
              </div>
              <div class="flex flex-row-reverse gap-3 items-end">
                <div class="w-7 h-7 rounded-full border border-default flex-shrink-0 bg-tertiary"></div>
                <div class="px-4 py-2 rounded-2xl rounded-br-sm border border-default bg-tertiary text-sm max-w-[80%]">
                  Can you give me an example?
                </div>
              </div>
              <div class="flex gap-3 items-end">
                <div class="w-7 h-7 rounded-full border border-default flex-shrink-0 flex items-center justify-center text-xs font-bold">AI</div>
                <div class="px-4 py-3 rounded-2xl rounded-bl-sm border border-default bg-tertiary text-sm flex gap-1 items-center">
                  <span class="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style="animation-delay: 0ms"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style="animation-delay: 150ms"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style="animation-delay: 300ms"></span>
                </div>
              </div>
            </div>
            <div class="px-5 py-3 border-t border-default">
              <div class="flex items-center gap-2 px-4 py-2 rounded-xl border border-default bg-tertiary text-sm">
                <span>Ask a question…</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="px-page py-section bg-primary">
      <div class="flex flex-col gap-16">
        <div class="flex flex-col gap-4 max-w-2xl">
          <h2 class="text-3xl font-bold">{{ t("features.aiAssistance.benefits.heading") }}</h2>
          <p class="text-lg">{{ t("features.aiAssistance.benefits.subheading") }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="key in ['instant', 'context', 'grounded', 'history']" :key="key"
               class="flex flex-col gap-4 p-8 rounded-2xl border border-default bg-tertiary">
            <div class="icon-dynamic w-10 h-10">
              <SpacedRepetitionFeatureIcon v-if="key === 'instant'"/>
              <AIAssistanceIcon v-else-if="key === 'context'"/>
              <FileIcon v-else-if="key === 'grounded'"/>
              <ClockIcon v-else/>
            </div>
            <h3 class="text-xl font-semibold">{{ t(`features.aiAssistance.benefits.${key}.title`) }}</h3>
            <p class="leading-relaxed">{{ t(`features.aiAssistance.benefits.${key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Flow -->
    <section class="px-page py-section bg-tertiary">
      <div class="flex flex-col md:flex-row justify-between items-center gap-15 flex-wrap">
        <div class="w-full md:w-4/10 flex flex-col gap-6">
          <div v-for="(step, i) in ['step1','step2','step3','step4']" :key="step">
            <div class="flex items-start gap-5">
              <div class="w-10 h-10 flex-shrink-0 rounded-full border border-default flex items-center justify-center font-bold">{{ i + 1 }}</div>
              <div>
                <p class="font-semibold">{{ t(`features.aiAssistance.flow.${step}.title`) }}</p>
                <p class="text-sm mt-1">{{ t(`features.aiAssistance.flow.${step}.description`) }}</p>
              </div>
            </div>
            <div v-if="i < 3" class="w-px h-6 ml-5 border-l border-default mt-2"></div>
          </div>
        </div>
        <div class="flex flex-col gap-6 w-full md:w-5/10">
          <h2 class="text-3xl font-bold">{{ t("features.aiAssistance.flow.heading") }}</h2>
          <p class="text-lg leading-relaxed">{{ t("features.aiAssistance.flow.subheading") }}</p>
          <Button class="w-44 h-12 text-lg" @click="goToRegister">
            <span class="font-semibold">{{ t("features.aiAssistance.flow.cta") }}</span>
          </Button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-page py-section bg-primary flex flex-col items-center gap-8 text-center">
      <h2 class="text-4xl font-bold max-w-xl">{{ t("features.aiAssistance.cta.heading") }}</h2>
      <p class="text-lg max-w-lg">{{ t("features.aiAssistance.cta.subheading") }}</p>
      <Button class="w-44 h-12 text-lg" @click="goToRegister">
        <span class="font-semibold">{{ t("features.aiAssistance.cta.button") }}</span>
      </Button>
    </section>

  </div>
  <Footer class="bg-primary"/>
</template>
