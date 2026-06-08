<script setup lang="ts">
import Flashcard from "./Flashcard.vue";
import {computed, watch} from "vue";
import {getIdRouteParam} from "@/app/router";
import {useRoute} from "vue-router";
import {flashcardsQueryKeys} from "@/entities/flashcard";
import {findAllDueFlashcards} from "../api/endpoints/find-all-due-flashcards";
import {decksQueryKeys} from "@/entities/deck";
import {decksApi} from "@/entities/deck";
import {useQuery} from "@tanstack/vue-query";
import {IconButton, IconLabel, QueryState} from "@/shared/ui";
import {useReview} from "../lib/use-review.ts";
import {useChatStore, Chat} from "@/entities/chat";
/* ===== AI GENERATED CODE START ===== */
import {useRouter} from "vue-router";
import {Button} from "@/shared/ui";
import {ArrowIcon, CheckIcon} from "@/shared/ui/icons";
import {useI18n} from "vue-i18n";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

const {t} = useI18n();
/* ===== AI GENERATED CODE END ===== */

const route = useRoute();
/* ===== AI GENERATED CODE START ===== */
const router = useRouter();
/* ===== AI GENERATED CODE END ===== */
const deckId = computed(() => getIdRouteParam(route.params.deckId));
const chatStore = useChatStore();

const {data: deckData, isLoading: deckIsLoading, error: deckError} = useQuery({
  queryKey: decksQueryKeys.byId(deckId.value),
  queryFn: () => decksApi.findOne(deckId.value)
});

const {data: dueFlashcardsData, isLoading: dueFlashcardsIsLoading, error: dueFlashcardsError} = useQuery({
  queryKey: flashcardsQueryKeys.dueByDeck(deckId.value),
  queryFn: () => findAllDueFlashcards(deckId.value),
});

const {
  currentFlashcard,
  currentIdx,
  remaining,
  isFirst,
  isLast,
  previous,
  next,
  assessReviewedFlashcard
} = useReview(dueFlashcardsData);

const isLoading = computed(() => deckIsLoading.value || dueFlashcardsIsLoading.value);
const error = computed(() => deckError.value ?? dueFlashcardsError.value ?? null);

watch([currentFlashcard], ([flashcard]) => {
  if (flashcard) {
    chatStore.setContext({
      flashcardId: flashcard.id,
    });
  }
}, {immediate: true});

/* ===== AI GENERATED CODE START ===== */
const goBackToDeck = () => {
  router.push({
    name: "deck-flashcards",
    params: {
      ...route.params,
      deckId: deckId.value,
    },
    query: route.query,
    hash: route.hash
  });
};

const isSessionComplete = computed(() => {
  return remaining.value === 0 && !isLoading.value && !error.value;
});
/* ===== AI GENERATED CODE END ===== */

</script>

<template>
  <div class="flex justify-between items-center gap-20
              w-full min-h-screen max-h-screen overflow-hidden
              bg-tertiary
              relative">
    <!--REFACTORING-->
    <div class="flex items-center gap-2
                absolute top-page left-page translate-y-5 z-10">
      <IconButton :size-rem="3.5"
                  has-ring
                  :ring-margin-percent="15"
                  @click="goBackToDeck"
                  class="border-2! border-default!
                         bg-primary">
        <ArrowIcon class="icon-static
                          rotate-180"/>
      </IconButton>
    </div>
    <!--REFACTORING-->

    <div class="grow justify-self-center">
      <QueryState :is-loading="isLoading"
                  :error="error"/>
      <!-- ===== AI GENERATED CODE START ===== -->
      <!-- Review Complete Screen -->
      <div v-if="isSessionComplete"
           class="justify-self-center
                  flex flex-col items-center justify-center
                  w-[45vw] h-[60vh]
                  bg-primary
                  rounded-3xl shadow-2xl
                  border-2 border-default
                  p-12 relative overflow-hidden">
        <!-- Decorative background elements -->
        <div
            class="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div
            class="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <!-- Content -->
        <div class="relative z-10 flex flex-col items-center gap-8 text-center">
          <!-- Congratulations Text -->
          <div class="flex flex-col gap-5">
            <!--REFACTORED-->
            <IconLabel class="gap-4">
              <template #icon>
                <CheckIcon class="icon-static-inverse
                                  w-14 h-14"/>
              </template>
              <template #label>
                <span class="text-5xl font-bold tracking-tight">
                  {{ t(codeToKey(codes.FLASHCARD_REVIEW_COMPLETE_CONGRATS)) }}
                </span>
              </template>
            </IconLabel>
            <!--REFACTORED-->
            <h2 class="text-2xl font-semibold">
              {{ t(codeToKey(codes.FLASHCARD_REVIEW_COMPLETE_TITLE)) }}
            </h2>
          </div>

          <!-- Message -->
          <p class="text-lg max-w-md leading-relaxed">
            {{ t(codeToKey(codes.FLASHCARD_REVIEW_COMPLETE_MESSAGE)) }}
          </p>

          <!-- Back Button -->
          <Button @click="goBackToDeck"
                  class="mt-4 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
            {{ t(codeToKey(codes.FLASHCARD_REVIEW_COMPLETE_BACK_TO_DECK)) }}
          </Button>
        </div>
      </div>
      <!-- ===== AI GENERATED CODE END ===== -->
      <Flashcard v-else-if="deckData && currentFlashcard"
                 :key="currentFlashcard.id"
                 :flashcard="currentFlashcard"
                 :deck="deckData"
                 :currentIdx
                 :remaining
                 :is-previous-enabled="!isFirst"
                 :is-next-enabled="!isLast"
                 class="w-[45vw] h-[60vh]"
                 @rated="assessReviewedFlashcard"
                 @previous="previous"
                 @next="next"/>
    </div>
    <Chat v-if="!isSessionComplete"
          class="self-stretch
                 w-[30vw] min-w-[20vw]"/>
  </div>
</template>