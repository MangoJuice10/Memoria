<script setup lang="ts">
import {Avatar} from "@/entities/user";
import {asset} from "@/shared/lib";
import {computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useQuery} from "@tanstack/vue-query";
import {storeToRefs} from "pinia";
import {queryClient} from "@/shared/api";
import {getIdRouteParam} from "@/app/router";
import {ArrowIcon, Button, FlashcardsIcon, IconLabel, Loader, QueryState, StarIcon} from "@/shared/ui";
import {useViewerStore} from "@/entities/viewer";
import {sharedDecksApi, sharedDecksQueryKeys} from "@/entities/shared-deck";
import {createCopySharedDeckMutation} from "@/entities/shared-deck/api/mutations/copy-shared-deck.mutation";
import {TagChip} from "@/entities/tag";
import FeedbackCard from "@/entities/feedback/ui/FeedbackCard.vue";
import FeedbackForm from "@/entities/feedback/ui/FeedbackForm.vue";
import {useToastStore} from "@/shared/model";
/* ===== AI GENERATED CODE START ===== */
import {SharedFlashcardPreview} from "@/entities/shared-deck";
/* ===== AI GENERATED CODE END ===== */

const route = useRoute();
const router = useRouter();

const sharedDeckId = getIdRouteParam(route.params.sharedDeckId as string | string[] | undefined);

const {viewer} = storeToRefs(useViewerStore());
const viewerId = computed(() => viewer.value?.id);

const {data, isLoading, error} = useQuery({
  queryKey: sharedDecksQueryKeys.detail(sharedDeckId),
  queryFn: () => sharedDecksApi.getSharedDeck(sharedDeckId),
});

const deck = computed(() => data.value);

const isOwner = computed(() => {
  if (viewerId.value !== undefined && deck.value !== undefined) {
    return viewerId.value === deck.value.ownerId;
  }
  return false;
});

const ratingDisplay = computed(() => {
  if (!deck.value || deck.value.averageRating === null) return null;
  return deck.value.averageRating.toFixed(1);
});

const ratingStars = computed(() => {
  if (!deck.value || deck.value.averageRating === null) return 0;
  return Math.round(deck.value.averageRating);
});

async function onFeedbackSubmitted() {
  await queryClient.invalidateQueries({
    queryKey: sharedDecksQueryKeys.detail(sharedDeckId),
  });
}

const {mutate: copyDeck, isPending} = createCopySharedDeckMutation();

function handleAddToCollection() {
  copyDeck(sharedDeckId, {
    onSuccess: (newDeck) => {
      useToastStore().push("Deck added to your collection!", "success", "create");
      router.push({
        name: "deck-flashcards",
        params: {...route.params, deckId: String(newDeck.id)},
      });
    },
  });
}
</script>

<template>
  <div class="flex flex-col min-h-screen bg-tertiary mt-[var(--height-navbar)]">
    <QueryState :is-loading :error class="grow px-page pb-page">
      <div v-if="deck" class="flex flex-col gap-8 max-w-7xl mx-auto w-full">

        <!-- Enhanced hero card -->
        <section class="rounded-3xl border-2 border-default shadow-2xl overflow-hidden">
          <!-- Cover image with overlay -->
          <div
              v-if="deck.coverUrl"
              class=" w-full h-80 border-b-2 border-default overflow-hidden">
            <img
                :src="deck.coverUrl"
                :alt="`Cover for ${deck.name}`"
                class="h-full w-full object-contain"/>
          </div>

          <div class="p-10
                      bg-primary">
            <!-- Title row with enhanced spacing -->
            <div class="flex items-start justify-between gap-8 mb-6">
              <div>
                <h1 class="text-4xl font-bold tracking-tight leading-tight mb-2">{{ deck.name }}</h1>
                <p class="text-lg text-muted leading-relaxed">{{ deck.description }}</p>
              </div>
              <Button
                  v-if="!isOwner"
                  :enabled="!isPending"
                  class="shrink-0 shadow-lg hover:shadow-xl transition-all px-6 py-3"
                  @click="handleAddToCollection">
                <span v-if="isPending" class="flex items-center gap-2.5">
                  <Loader class="w-5 h-5 border-2"/>
                  <span class="font-semibold">Adding...</span>
                </span>
                <span v-else class="flex items-center gap-2.5 font-semibold">

                  Add to Collection
                </span>
              </Button>
            </div>

            <!-- Tags with better styling -->
            <div v-if="deck.tags.length > 0" class="flex flex-wrap gap-5 mb-8">
              <TagChip v-for="tag in deck.tags" :key="tag.id" :tag="tag"/>
            </div>

            <!-- Enhanced stats row -->
            <div class="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t-2 border-default">
              <span class="inline-flex items-center gap-2 font-bold text-base">
                <div class="p-2 rounded-lg bg-secondary/10">
                  <span class="flex items-center gap-1"
                        :aria-label="ratingDisplay ? `Rating: ${ratingDisplay} out of 5` : 'No ratings yet'">
                    <StarIcon
                        v-for="s in 5"
                        :key="s"
                        class="w-5 h-5"
                        :class="s <= ratingStars ? 'icon-static-inverse' : 'icon-static'"
                        :aria-hidden="true"
                    />
                  </span>
                </div>
                <span v-if="ratingDisplay" class="text-lg">{{ ratingDisplay }}</span>
                <span v-else class="font-normal text-muted">No ratings yet</span>
              </span>

              <span class="inline-flex items-center gap-2 text-base font-semibold text-muted">
                <IconLabel class="gap-2.5">
                  <template #icon>
                    <FlashcardsIcon class="w-6 h-6"/>
                  </template>
                  <template #label>
                    <span>
                      {{ deck.flashcardsCount }} flashcard{{ deck.flashcardsCount === 1 ? "" : "s" }}
                    </span>
                  </template>
                </IconLabel>
              </span>

              <div class="inline-flex items-center gap-2 text-base font-semibold text-muted">
                <Avatar :src="deck.ownerAvatarUrl ?? asset('filler/noAvatar.png')"
                        class="w-8 h-8 rounded-full overflow-hidden border-2 border-default bg-tertiary"/>
                {{ deck.ownerUsername }}
              </div>
            </div>
          </div>
        </section>

        <!-- Flashcards section -->
        <section class="rounded-4xl border border-default bg-primary p-10 shadow-lg">
          <div class="flex items-center justify-between gap-4 mb-8">
            <h2 class="text-xl font-semibold">Flashcards</h2>
            <span class="rounded-full border border-default bg-tertiary px-3 py-1 text-sm font-semibold">
              {{ deck.flashcards.length }}
            </span>
          </div>

          <div
              v-if="deck.flashcards.length === 0"
              class="flex flex-col items-center gap-3 py-12 border border-dashed border-default rounded-3xl bg-tertiary text-center"
          >
            <p class="text-base font-semibold">No flashcards yet</p>
            <p class="text-sm text-muted">This deck doesn't have any flashcards.</p>
          </div>

          <!-- Horizontal scrolling carousel for flashcards -->
          <div v-else class="relative">
            <div class="px-5 py-15 overflow-x-auto
                        scrollbar-thin scrollbar-thumb-default scrollbar-track-tertiary">
              <div class="flex gap-12.5 min-w-min">
                <!-- ===== AI GENERATED CODE START ===== -->
                <SharedFlashcardPreview
                    v-for="flashcard in deck.flashcards"
                    :key="flashcard.id"
                    :flashcard="flashcard"
                />
                <!-- ===== AI GENERATED CODE END ===== -->
              </div>
            </div>

            <!-- Scroll hint -->
            <p class="flex justify-center items-center gap-3
                      mt-4
                      text-center">
              <ArrowIcon class="w-6 h-6
                                rotate-180
                                opacity-80"/>
              <span class="text-muted font-semibold">
                {{ deck.flashcards.length > 3 ? "Scroll to see all flashcards" : "" }}
              </span>
              <ArrowIcon class="w-6 h-6
                                opacity-80"/>
            </p>
          </div>
        </section>

        <!-- Reviews and Feedback sections side by side -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Reviews section -->
          <section class="rounded-4xl border border-default
                          text-base
                          bg-primary p-10 shadow-lg flex flex-col">
            <div class="flex items-center justify-between gap-4 mb-8">
              <h2 class="text-xl font-semibold">Reviews</h2>
              <span class="rounded-full border border-default bg-tertiary px-3 py-1 text-sm font-semibold">
                {{ deck.feedback.length }}
              </span>
            </div>

            <div
                v-if="deck.feedback.length === 0"
                class="flex flex-col items-center gap-3 py-12 border border-dashed border-default rounded-3xl bg-tertiary text-center">
              <p class="text-base font-semibold">No reviews yet</p>
              <p class="text-sm text-muted">Be the first to leave a review for this deck.</p>
            </div>

            <div v-else class="flex-1 overflow-y-auto max-h-[600px]">
              <ul class="flex flex-col gap-4">
                <li v-for="fb in deck.feedback" :key="fb.id">
                  <FeedbackCard :feedback="fb"/>
                </li>
              </ul>
            </div>
          </section>

          <!-- Leave a review (non-owners only) -->
          <section v-if="!isOwner" class="rounded-4xl border border-default bg-primary p-10 shadow-lg">
            <h2 class="text-xl font-semibold">Leave a review</h2>
            <FeedbackForm
                :shared-deck-id="sharedDeckId"
                @submitted="onFeedbackSubmitted"
            />
          </section>
        </div>

      </div>
    </QueryState>
  </div>
</template>
