<script setup lang="ts">
import {createReviewMutation} from "@/pages/review/api/mutations/review.mutation";
import {computed, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import type {FlashcardResponseDto} from "@/entities/flashcard";
import type {ReviewRating} from "../model/review.dto";
import type {DeckResponseDto} from "@/entities/deck";
import FlashcardSide from "./FlashcardSide.vue";
import FlashcardControls from "./FlashcardControls.vue";
import RatingControls from "./RatingControls.vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  deck: DeckResponseDto;
  flashcard: FlashcardResponseDto;
  currentIdx: number;
  remaining: number;
  isPreviousEnabled: boolean;
  isNextEnabled: boolean;
}>();

const emit = defineEmits<{
  (e: "rated", flashcard: FlashcardResponseDto): void;
  (e: "previous"): void;
  (e: "next"): void;
}>();

const {t} = useI18n();

const review = createReviewMutation();

const isFlipped = ref(false);
const reviewStartedAt = ref<Date>(new Date());

const heading = computed(() =>
    `${props.deck.name}: ${t("resources.flashcard.name")} ${props.currentIdx + 1} of ${props.remaining}`);

// Track when a new flashcard is shown
watch(() => props.flashcard.id, () => {
  reviewStartedAt.value = new Date();
  isFlipped.value = false;
});

function handleFlip() {
  isFlipped.value = !isFlipped.value;
}

async function handleRatingChange(rating: ReviewRating) {
  const reviewedFlashcard = await review.mutateAsync({
    deckId: props.deck.id,
    flashcardId: props.flashcard.id,
    reviewDto: {
      rating,
      startedAt: reviewStartedAt.value.toISOString(),
    }
  });
  isFlipped.value = false;
  emit("rated", reviewedFlashcard);
}
</script>

<template>
  <div class="flex flex-col items-center gap-10">
    <div class="perspective-distant"
         v-bind="$attrs">
      <div class="relative
                  w-full h-full
                  transition-transform transform-3d duration-500"
           :class="{'-rotate-y-180': isFlipped}">

        <FlashcardSide :heading="heading"
                       :content="flashcard.front"/>
        <FlashcardSide :heading="heading"
                       :content="flashcard.back"
                       class="-rotate-y-180"/>
      </div>
    </div>
    <FlashcardControls v-if="!isFlipped"
                       :is-previous-enabled
                       :is-next-enabled
                       @flip="handleFlip"
                       @previous="$emit('previous')"
                       @next="$emit('next')"
                       class="text-base"/>
    <RatingControls v-else
                    @rating-change="handleRatingChange"
                    class="text-base"/>
  </div>
</template>