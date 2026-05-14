<script setup lang="ts">
import {decksApi, decksQueryKeys} from "@/entities/deck";
import DeckCard from "@/entities/deck/ui/DeckCard.vue";
import {useQuery} from "@tanstack/vue-query";
import {Loader, Error} from "@/shared/ui";
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
    <div v-if="isLoading"
         class="grow flex justify-center items-center
                w-full h-full">
      <Loader/>
    </div>
    <div v-else-if="error"
         class="grow flex justify-center items-center
                w-full h-full">
      <Error>
        {{ error.message }}
      </Error>
    </div>
    <div class="decks pt-10">
      <CreateDeck/>
      <DeckCard v-for="deck in data"
                :id="deck.id"
                :name="deck.name"
                :description="deck.description"
                :is-public="deck.isPublic"
                :flashcards-count="deck.flashcardsCount"/>
    </div>
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