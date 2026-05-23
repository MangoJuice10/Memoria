<script setup lang="ts">
import Flashcard from "./Flashcard.vue";
import {computed, watch} from "vue";
import {getIdRouteParam} from "@/app/router";
import {useRoute} from "vue-router";
import {flashcardsQueryKeys} from "@/entities/flashcard";
import {findAllDueFlashcards} from "../api/find-all-due-flashcards";
import {decksQueryKeys} from "@/entities/deck";
import {decksApi} from "@/entities/deck";
import {useQuery} from "@tanstack/vue-query";
import {QueryState} from "@/shared/ui";
import {useReview} from "../lib/use-review.ts";
import {useChatStore, Chat} from "@/entities/chat";

const route = useRoute();
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
  markRated
} = useReview(dueFlashcardsData);

const isLoading = computed(() => deckIsLoading || dueFlashcardsIsLoading);
const error = computed(() => deckError ?? dueFlashcardsError ?? null);

watch([currentFlashcard, deckId], ([flashcard, id]) => {
  if (flashcard) {
    chatStore.setContext({
      flashcardFront: flashcard.front,
      flashcardBack: flashcard.back,
      deckId: id
    });
  }
}, {immediate: true});

</script>

<template>
  <div class="flex justify-between items-center gap-20
              w-full min-h-screen max-h-screen overflow-hidden
              bg-tertiary">
    <div class="grow justify-self-center">
      <QueryState :is-loading="isLoading.value"
                  :error="error.value"/>
      <Flashcard v-if="deckData && currentFlashcard"
                 :key="currentFlashcard.id"
                 :flashcard="currentFlashcard"
                 :deck="deckData"
                 :currentIdx
                 :remaining
                 :is-previous-enabled="!isFirst"
                 :is-next-enabled="!isLast"
                 class="w-[45vw] h-[60vh]"
                 @rated="markRated"
                 @previous="previous"
                 @next="next"/>
    </div>
    <Chat class="self-stretch
                 w-[30vw] min-w-[20vw]"/>
  </div>
</template>