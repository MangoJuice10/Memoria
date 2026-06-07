<script setup lang="ts">
import {ref, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useQuery} from "@tanstack/vue-query";
import {storeToRefs} from "pinia";
import {QueryState, SharedDecksIntroductionIcon, Searchbar, RatingFilter, type RatingOption} from "@/shared/ui";
import {useViewerStore} from "@/entities/viewer";
import {sharedDecksApi, sharedDecksQueryKeys} from "@/entities/shared-deck";
import SharedDeckCard from "@/entities/shared-deck/ui/SharedDeckCard.vue";
/* ===== AI GENERATED CODE START ===== */
import {TagFilter} from "@/entities/tag";
/* ===== AI GENERATED CODE END ===== */

const route = useRoute();
const router = useRouter();

const {viewer} = storeToRefs(useViewerStore());
const viewerId = computed(() => viewer.value?.id);

const minRating = ref<number | undefined>(undefined);
const selectedTagIds = ref<Set<number>>(new Set());
/* ===== AI GENERATED CODE START ===== */
const searchQuery = ref("");
/* ===== AI GENERATED CODE END ===== */

const {data, isLoading, error} = useQuery({
  queryKey: computed(() => sharedDecksQueryKeys.list(minRating.value)),
  queryFn: () => sharedDecksApi.getSharedDecks(minRating.value),
});

const allDecks = computed(() => data.value ?? []);

// Extract all unique tags from decks
const allTags = computed(() => {
  const tagMap = new Map();
  allDecks.value.forEach(deck => {
    deck.tags.forEach(tag => {
      if (!tagMap.has(tag.id)) {
        tagMap.set(tag.id, tag);
      }
    });
  });
  return Array.from(tagMap.values()).sort((a, b) => a.name.localeCompare(b.name));
});

// Filter decks by selected tags
const decks = computed(() => {
  let result = allDecks.value;
  
  /* ===== AI GENERATED CODE START ===== */
  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(deck => 
      deck.name.toLowerCase().includes(query) || 
      deck.description.toLowerCase().includes(query)
    );
  }
  /* ===== AI GENERATED CODE END ===== */
  
  // Filter by selected tags
  if (selectedTagIds.value.size === 0) {
    return result;
  }
  return result.filter(deck =>
      deck.tags.some(tag => selectedTagIds.value.has(tag.id))
  );
});

const ratingOptions: RatingOption[] = [
  {label: "All", value: undefined},
  {label: "1+", value: 1},
  {label: "2+", value: 2},
  {label: "3+", value: 3},
  {label: "4+", value: 4},
  {label: "5+", value: 5},
];

function toggleTag(tagId: number) {
  if (selectedTagIds.value.has(tagId)) {
    selectedTagIds.value.delete(tagId);
  } else {
    selectedTagIds.value.add(tagId);
  }
  // Trigger reactivity
  selectedTagIds.value = new Set(selectedTagIds.value);
}

function clearTagFilters() {
  selectedTagIds.value.clear();
  selectedTagIds.value = new Set();
}

function navigateToDeck(deckId: number) {
  router.push({
    name: "shared-deck",
    params: {...route.params, sharedDeckId: deckId},
  });
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-tertiary">
    <!-- Page header with enhanced design -->
    <section class="px-page pt-10 pb-10 mb-8">
      <div class="rounded-3xl border border-default bg-primary shadow-xl p-10 relative overflow-hidden">
        <!-- Decorative background element -->
        <div
            class="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

        <div class="flex flex-col gap-10 flex-1 min-w-0">
          <div class="relative z-10 flex items-start gap-6">
            <div class="p-4 rounded-2xl bg-secondary/10 border border-default shadow-sm">
              <SharedDecksIntroductionIcon class="icon-dynamic w-12 h-12"/>
            </div>
            <div>
              <h1 class="text-3xl font-bold tracking-tight">Shared Decks</h1>
              <p class="mt-2 text-base text-muted leading-relaxed">
                Discover and explore flashcard decks created by the community
              </p>
            </div>
          </div>

          <!-- ===== AI GENERATED CODE START ===== -->
          <!-- Search bar -->
          <Searchbar v-model="searchQuery" placeholder="Search decks by name or description..."/>
          <!-- ===== AI GENERATED CODE END ===== -->

          <!-- ===== AI GENERATED CODE START ===== -->
          <!-- Rating filter section -->
          <RatingFilter
              :options="ratingOptions"
              :selected-value="minRating"
              @update="minRating = $event"
          />
          <!-- ===== AI GENERATED CODE END ===== -->

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

    <div class="px-page pb-page">
      <QueryState :is-loading :error class="grow">
        <!-- Enhanced empty state -->
        <div v-if="decks.length === 0"
             class="flex flex-col items-center gap-5 py-32 border-2 border-dashed border-default rounded-3xl bg-gradient-to-br from-primary to-tertiary text-center">
          <div class="p-6 rounded-2xl bg-tertiary border border-default">
            <SharedDecksIntroductionIcon class="icon-static w-24"/>
          </div>
          <div class="max-w-md">
            <h2 class="text-2xl font-bold mb-2">No decks found</h2>
            <p class="text-base text-muted leading-relaxed">
              {{
                selectedTagIds.size > 0
                    ? "No decks match the selected tags. Try adjusting your filters."
                    : minRating
                        ? "No decks match the selected rating. Try adjusting your filter or browse all decks."
                        : "No public decks have been shared yet. Be the first to share your knowledge!"
              }}
            </p>
          </div>
        </div>

        <!-- Enhanced deck grid with better spacing -->
        <div v-else class="shared-decks-container">
          <SharedDeckCard
              v-for="deck in decks"
              :key="deck.id"
              :deck="deck"
              :viewer-id="viewerId"
              :owner-id="deck.ownerId"
              @click="navigateToDeck(deck.id)"
          />
        </div>
      </QueryState>
    </div>
  </div>
</template>

<style scoped>
.shared-decks-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--width-deck));
  justify-content: space-between;
  gap: 2rem;
}

@media (min-width: 40rem) {
  .shared-decks-container {
    gap: 2.5rem;
  }
}

@media (min-width: 48rem) {
  .shared-decks-container {
    gap: 3rem;
  }
}

@media (min-width: 80rem) {
  .shared-decks-container {
    gap: 3.5rem;
  }
}
</style>
