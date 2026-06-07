<script setup lang="ts">
import {decksApi, decksQueryKeys} from "@/entities/deck";
import DeckCard from "@/entities/deck/ui/DeckCard.vue";
import {useQuery} from "@tanstack/vue-query";
import {DecksIntroductionIcon, QueryState, Searchbar} from "@/shared/ui";
import {CreateDeck} from "@/entities/deck";
/* ===== AI GENERATED CODE START ===== */
import {ref, computed} from "vue";
import {TagFilter} from "@/entities/tag";
import {useI18n} from "vue-i18n";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
/* ===== AI GENERATED CODE END ===== */

/* ===== AI GENERATED CODE START ===== */
const {t} = useI18n();
/* ===== AI GENERATED CODE END ===== */

const {data, isLoading, error} = useQuery({
  queryKey: decksQueryKeys.all,
  queryFn: () => decksApi.findAll()
});

/* ===== AI GENERATED CODE START ===== */
const searchQuery = ref("");
const selectedTagIds = ref<Set<number>>(new Set());

const allDecks = computed(() => data.value ?? []);

// Extract all unique tags from decks
const allTags = computed(() => {
  const tagMap = new Map();
  const decks = allDecks.value;
  if (!decks || !Array.isArray(decks)) return [];

  decks.forEach(deck => {
    if (!deck.tags || !Array.isArray(deck.tags)) return;
    deck.tags.forEach(tag => {
      if (!tagMap.has(tag.id)) {
        tagMap.set(tag.id, tag);
      }
    });
  });
  return Array.from(tagMap.values()).sort((a, b) => a.name.localeCompare(b.name));
});

// Filter decks by search query and selected tags
const filteredDecks = computed(() => {
  let result = allDecks.value;
  if (!result || !Array.isArray(result)) return [];

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(deck =>
        deck.name.toLowerCase().includes(query) ||
        deck.description.toLowerCase().includes(query)
    );
  }

  // Filter by selected tags
  if (selectedTagIds.value.size > 0) {
    result = result.filter(deck =>
        deck.tags && Array.isArray(deck.tags) && deck.tags.some(tag => selectedTagIds.value.has(tag.id))
    );
  }

  return result;
});

function toggleTag(tagId: number) {
  if (selectedTagIds.value.has(tagId)) {
    selectedTagIds.value.delete(tagId);
  } else {
    selectedTagIds.value.add(tagId);
  }
  selectedTagIds.value = new Set(selectedTagIds.value);
}

function clearTagFilters() {
  selectedTagIds.value.clear();
  selectedTagIds.value = new Set();
}

/* ===== AI GENERATED CODE END ===== */
</script>

<template>
  <div class="flex flex-col min-h-screen bg-tertiary">
    <!-- ===== AI GENERATED CODE START ===== -->
    <!-- Page header with search and filters -->
    <section class="px-page pt-10 pb-10 mb-8">
      <div class="rounded-3xl border border-default bg-primary shadow-xl p-10">
        <div class="flex flex-col gap-6">
          <!-- Title -->
          <div class="flex gap-5">
            <div class="p-4 rounded-2xl border border-default">
              <DecksIntroductionIcon class="icon-static w-12"/>
            </div>
            <div>
            <h1 class="text-3xl font-bold tracking-tight">{{ t(codeToKey(codes.NAVBAR_ITEM_DECKS)) }}</h1>
            <p class="mt-2 text-base text-muted leading-relaxed">
              {{ t(codeToKey(codes.DECK_PAGE_DESCRIPTION)) }}
            </p>
            </div>
          </div>

          <!-- Search bar -->
          <Searchbar v-model="searchQuery" :placeholder="t(codeToKey(codes.DECK_SEARCH_PLACEHOLDER))"/>

          <!-- ===== AI GENERATED CODE START ===== -->
          <!-- Tag filter section -->
          <TagFilter
              :tags="allTags"
              :selected-tag-ids="selectedTagIds"
              :show-clear-button="true"
              @toggle-tag="toggleTag"
              @clear-filters="clearTagFilters"
          />
          <!-- ===== AI GENERATED CODE END ===== -->
        </div>
      </div>
    </section>
    <!-- ===== AI GENERATED CODE END ===== -->

    <div class="px-page pb-page">
      <QueryState :is-loading
                  :error
                  class="grow">
        <div class="decks">
          <CreateDeck/>
          <!-- ===== AI GENERATED CODE START ===== -->
          <DeckCard v-for="deck in filteredDecks"
                    :key="deck.id"
                    :id="deck.id"
                    :name="deck.name"
                    :description="deck.description"
                    :is-public="deck.isPublic"
                    :cover-url="deck.coverUrl"
                    :flashcards-count="deck.flashcardsCount"
                    :tags="deck.tags"/>
          <!-- ===== AI GENERATED CODE END ===== -->
        </div>
      </QueryState>
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