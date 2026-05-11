<script setup lang="ts">
import {CreateFlashcard, FlashcardCard} from "@/features/flashcard";
import {computed} from "vue";
import {flashcardsApi, flashcardsQueryKeys} from "@/entities/flashcard";
import {useRoute} from "vue-router";
import {getIdRouteParam} from "@/app/router";
import {useQuery} from "@tanstack/vue-query";
import {Error, Loader} from "@/shared/ui";

const route = useRoute();
const deckId = computed(() => getIdRouteParam(route.params.deckId));

const {data, isLoading, error} = useQuery({
  queryKey: computed(() => flashcardsQueryKeys.byDeck(deckId.value)),
  queryFn: () => flashcardsApi.findAll(deckId.value)
});

const flashcards = computed(() => data.value ?? []);

</script>

<template>
  <div v-if="isLoading"
       class="flex justify-center items-center
                w-full h-full">
    <Loader/>
  </div>
  <div v-else-if="error" class="flex justify-center items-center
              w-full h-full">
    <Error>
      {{ error.message }}
    </Error>
  </div>
  <div v-else class="flashcards">
    <CreateFlashcard :deck-id="Number(route.params.deckId)"/>
    <!--TODO-->
    <FlashcardCard v-for="flashcard in flashcards"
                   :id="flashcard.id"
                   :key="flashcard.id"
                   :front="flashcard.front"
                   :back="flashcard.back"
                   :interval="1"
                   :deckId="flashcard.deckId"/>
  </div>
</template>

<style scoped>
.flashcards {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, var(--flashcard-width));
  gap: 3.75rem;
}
</style>
