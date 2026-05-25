<script setup lang="ts">
import {Footer} from "@/widgets/footer";
import {Button, TrustworthyAnswersFeatureIcon, AIAssistanceIcon, CheckIcon, WarningIcon, PdfFileIcon, DocxFileIcon, TxtFileIcon} from "@/shared/ui";
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
            {{ t("features.trustworthyAnswers.badge") }}
          </span>
          <h1 class="text-5xl font-bold leading-tight">
            {{ t("features.trustworthyAnswers.hero.headline") }}<br/>
            <span>{{ t("features.trustworthyAnswers.hero.headlineMuted") }}</span>
          </h1>
          <p class="text-lg leading-relaxed">{{ t("features.trustworthyAnswers.hero.subheadline") }}</p>
          <Button class="w-44 h-12 text-lg" @click="goToRegister">
            <span class="font-semibold">{{ t("features.trustworthyAnswers.hero.cta") }}</span>
          </Button>
        </div>

        <!-- Source pipeline illustration -->
        <div class="w-full md:w-4/10 flex justify-center">
          <div class="w-full max-w-sm flex flex-col gap-3">
            <div class="flex items-center gap-4 p-4 rounded-xl border border-default bg-primary">
              <div class="w-10 h-10 rounded-lg border border-default flex items-center justify-center flex-shrink-0">
                <PdfFileIcon class="w-7 h-7"/>
              </div>
              <div class="flex flex-col gap-0.5">
                <span class="text-base font-semibold">Lecture Notes — Chapter 4.pdf</span>
                <span class="text-xs">{{ t("features.trustworthyAnswers.hero.sourceLabel") }}</span>
              </div>
              <span class="ml-auto text-xs px-2 py-0.5 rounded-full border border-default">{{ t("features.trustworthyAnswers.hero.sourceTag") }}</span>
            </div>
            <div class="flex justify-center text-xl">↓</div>
            <div class="flex items-center gap-4 p-4 rounded-xl border border-default bg-primary">
              <div class="w-10 h-10 rounded-lg border border-default flex items-center justify-center text-lg flex-shrink-0">AI</div>
              <div class="flex flex-col gap-0.5">
                <span class="text-base font-semibold">{{ t("features.trustworthyAnswers.hero.ragTitle") }}</span>
                <span class="text-xs">{{ t("features.trustworthyAnswers.hero.ragDescription") }}</span>
              </div>
            </div>
            <div class="flex justify-center text-xl">↓</div>
            <div class="flex flex-col gap-2 p-4 rounded-xl border border-default bg-primary">
              <span class="text-xs uppercase tracking-widest">{{ t("features.trustworthyAnswers.hero.answerLabel") }}</span>
              <p class="text-base leading-relaxed">
                The mitochondria produces ATP through oxidative phosphorylation…
              </p>
              <div class="flex items-center gap-2 mt-1 pt-2 border-t border-default">
                <span class="text-xs">{{ t("features.trustworthyAnswers.hero.sourceFooter") }}</span>
                <span class="text-xs">Lecture Notes — Chapter 4.pdf</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- The problem with generic AI -->
    <section class="px-page py-section bg-primary">
      <div class="flex flex-col gap-16">
        <div class="flex flex-col gap-4 max-w-2xl">
          <h2 class="text-3xl font-bold">{{ t("features.trustworthyAnswers.problem.heading") }}</h2>
          <p class="text-lg">{{ t("features.trustworthyAnswers.problem.subheading") }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex flex-col gap-4 p-8 rounded-2xl border border-default bg-tertiary">
            <div class="flex items-center gap-3 mb-2">
              <div class="icon-dynamic w-10 h-10"><WarningIcon/></div>
              <h3 class="text-xl font-semibold">{{ t("features.trustworthyAnswers.problem.generic.title") }}</h3>
            </div>
            <ul class="flex flex-col gap-3">
              <li v-for="i in [1,2,3,4]" :key="i" class="flex items-start gap-3 text-base">
                <span class="mt-0.5 flex-shrink-0">✗</span>
                {{ t(`features.trustworthyAnswers.problem.generic.con${i}`) }}
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-4 p-8 rounded-2xl border border-default bg-tertiary">
            <div class="flex items-center gap-3 mb-2">
              <div class="icon-dynamic w-10 h-10"><CheckIcon/></div>
              <h3 class="text-xl font-semibold">{{ t("features.trustworthyAnswers.problem.memoria.title") }}</h3>
            </div>
            <ul class="flex flex-col gap-3">
              <li v-for="i in [1,2,3,4]" :key="i" class="flex items-start gap-3 text-base">
                <span class="mt-0.5 flex-shrink-0">✓</span>
                {{ t(`features.trustworthyAnswers.problem.memoria.pro${i}`) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- How RAG works -->
    <section class="px-page py-section bg-tertiary">
      <div class="flex flex-col md:flex-row justify-between items-center gap-15 flex-wrap">
        <div class="flex flex-col gap-8 w-full md:w-5/10">
          <h2 class="text-3xl font-bold">{{ t("features.trustworthyAnswers.howItWorks.heading") }}</h2>
          <p class="text-lg leading-relaxed">{{ t("features.trustworthyAnswers.howItWorks.subheading") }}</p>
          <div class="flex flex-col gap-4">
            <div v-for="i in [1,2,3]" :key="i" class="flex items-start gap-4">
              <span class="w-8 h-8 flex-shrink-0 rounded-lg border border-default flex items-center justify-center text-base font-bold">{{ i }}</span>
              <p class="text-base leading-relaxed pt-1">{{ t(`features.trustworthyAnswers.howItWorks.step${i}`) }}</p>
            </div>
          </div>
        </div>

        <!-- Supported formats -->
        <div class="w-full md:w-4/10 flex flex-col gap-4">
          <span class="text-base font-semibold uppercase tracking-widest">{{ t("features.trustworthyAnswers.howItWorks.formatsLabel") }}</span>
          <div class="grid grid-cols-3 gap-3">
            <div class="flex flex-col items-center gap-2 p-4 rounded-xl border border-default bg-primary">
              <PdfFileIcon class="w-8 h-8"/>
              <span class="text-xs font-semibold">PDF</span>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 rounded-xl border border-default bg-primary">
              <DocxFileIcon class="w-8 h-8"/>
              <span class="text-xs font-semibold">DOCX</span>
            </div>
            <div class="flex flex-col items-center gap-2 p-4 rounded-xl border border-default bg-primary">
              <TxtFileIcon class="w-8 h-8"/>
              <span class="text-xs font-semibold">TXT</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-page py-section bg-primary flex flex-col items-center gap-8 text-center">
      <h2 class="text-4xl font-bold max-w-xl">{{ t("features.trustworthyAnswers.cta.heading") }}</h2>
      <p class="text-lg max-w-lg">{{ t("features.trustworthyAnswers.cta.subheading") }}</p>
      <Button class="w-44 h-12 text-lg" @click="goToRegister">
        <span class="font-semibold">{{ t("features.trustworthyAnswers.cta.button") }}</span>
      </Button>
    </section>

  </div>
  <Footer class="bg-primary"/>
</template>
