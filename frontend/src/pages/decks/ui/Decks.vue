<script setup lang="ts">
import {decksApi, decksQueryKeys} from "@/entities/deck";
import DeckCard from "@/entities/deck/ui/DeckCard.vue";
import {useQuery} from "@tanstack/vue-query";
import {QueryState} from "@/shared/ui";
import {CreateDeck} from "@/entities/deck";

const {data, isLoading, error} = useQuery({
  queryKey: decksQueryKeys.all,
  queryFn: () => decksApi.findAll()
});
</script>

<template>
  <div class="flex flex-col
              min-h-screen px-page py-page
              bg-tertiary">
    <QueryState :is-loading
                :error
                class="grow">
      <div class="decks pt-10">
        <CreateDeck/>
        <DeckCard v-for="deck in data"
                  :id="deck.id"
                  :name="deck.name"
                  :description="deck.description"
                  :is-public="deck.isPublic"
                  :cover-url="deck.coverUrl"
                  :flashcards-count="deck.flashcardsCount"/>
      </div>
    </QueryState>
  </div>
</template>

<style scoped>
.decks {
  display: grid;
  grid-template-columns: repeat(1, var(--width-deck));
  justify-content: space-between;
  gap: 3.75rem;
}

@media (min-width: 40rem) {
  .decks {
    grid-template-columns: repeat(2, var(--width-deck));
  }
}

@media (min-width: 48rem) {
  .decks {
    grid-template-columns: repeat(3, var(--width-deck));
  }
}

@media (min-width: 64rem) {
  .decks {
    grid-template-columns: repeat(4, var(--width-deck));
  }
}

@media (min-width: 80rem) {
  .decks {
    grid-template-columns: repeat(4, var(--width-deck));
  }
}

@media (min-width: 96rem) {
  .decks {
    grid-template-columns: repeat(4, var(--width-deck));
  }
}
</style>