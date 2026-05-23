<script setup lang="ts">
import {CreateFlashcard, FlashcardCard} from "@/entities/flashcard";
import {computed} from "vue";
import {flashcardsApi, flashcardsQueryKeys} from "@/entities/flashcard";
import {useRoute} from "vue-router";
import {getIdRouteParam} from "@/app/router";
import {useQuery} from "@tanstack/vue-query";
import {useSearch} from "@/shared/lib";
import {Button, IconLabel, LearningIcon, LocalizedLink, QueryState} from "@/shared/ui";
import {Toolbar} from "@/widgets/toolbar";

const route = useRoute();
const deckId = computed(() => getIdRouteParam(route.params.deckId));

const {search, committedSearch} = useSearch();

const {data, isLoading, error} = useQuery({
  queryKey: computed(() => flashcardsQueryKeys.byDeck(deckId.value, committedSearch.value || undefined)),
  queryFn: () => flashcardsApi.findAll(deckId.value, committedSearch.value || undefined)
});

const flashcards = computed(() => data.value ?? []);

</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <Toolbar v-model:search="search"/>
      <LocalizedLink name="review" :params="{deckId: String(deckId)}">
        <Button>
          <IconLabel>
            <template #label>
              {{ $t("actions.study") }}
            </template>
            <template #icon>
              <LearningIcon class="icon-static-inverse w-7"/>
            </template>
          </IconLabel>
        </Button>
      </LocalizedLink>
    </div>
    <QueryState
        :is-loading
        :error
        class="grow">
      <div v-if="data"
           class="flashcards mt-10">
        <CreateFlashcard :deck-id="Number(route.params.deckId)"/>
        <FlashcardCard v-for="flashcard in flashcards"
                       :id="flashcard.id"
                       :key="flashcard.id"
                       :front="flashcard.front"
                       :back="flashcard.back"
                       :intervalDays="flashcard.intervalDays"
                       :dueAt="flashcard.dueAt"
                       :deckId="flashcard.deckId"/>
      </div>
    </QueryState>
  </div>
</template>

<style scoped>
.flashcards {
  display: grid;
  grid-template-columns: repeat(2, var(--width-flashcard));
  justify-content: space-between;
  gap: 3.75rem;
}

@media (min-width: 40rem) {
  .flashcards {
    grid-template-columns: repeat(3, var(--width-flashcard));
  }
}

@media (min-width: 48rem) {
  .flashcards {
    grid-template-columns: repeat(4, var(--width-flashcard));
  }
}

@media (min-width: 64rem) {
  .flashcards {
    grid-template-columns: repeat(5, var(--width-flashcard));
  }
}

@media (min-width: 80rem) {
  .flashcards {
    grid-template-columns: repeat(5, var(--width-flashcard));
  }
}

@media (min-width: 96rem) {
  .flashcards {
    grid-template-columns: repeat(6, var(--width-flashcard));
  }
}
</style>
