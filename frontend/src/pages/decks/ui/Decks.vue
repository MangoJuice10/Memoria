<script setup lang="ts">
import {decksApi, type DeckResponseDto} from "@/entities/deck";
import {onMounted, ref} from "vue";
import DeckCard from "../ui/DeckCard.vue";

const decks = ref<DeckResponseDto[]>([]);

onMounted(async () => {
  decks.value = await decksApi.findAll();
});
</script>

<template>
  <div class="decks">
    <DeckCard v-for="deck in decks"
              :id="deck.id"
              :name="deck.name"
              :description="deck.description"
              :is-public="deck.isPublic"/>
  </div>
</template>

<style scoped>
.decks {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fit, var(--deck-width));
  gap: 3.75rem;
}
</style>