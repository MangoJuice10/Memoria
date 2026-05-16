<script setup lang="ts">
import {Flashcard} from "@/entities/flashcard";
import {computed} from "vue";
import {getIdRouteParam} from "@/app/router";
import {useRoute} from "vue-router";
import {findAllDueFlashcards, flashcardsQueryKeys} from "@/entities/flashcard";
import {decksQueryKeys} from "@/entities/deck";
import {decksApi} from "@/entities/deck";
import {useQuery} from "@tanstack/vue-query";
import {QueryState} from "@/shared/ui";
import {useReview} from "../lib/use-review.ts";

const route = useRoute();
const deckId = computed(() => getIdRouteParam(route.params.deckId));

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

</script>

<template>
  <div class="flex justify-around items-center
              min-h-screen
              bg-tertiary">
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
               class="w-[50vw] h-[60vh]"
               @rated="markRated"
               @previous="previous"
               @next="next"/>
  </div>
</template>