<script setup lang="ts">
import {computed, ref} from "vue";
import {type FlashcardResponseDto, flashcardsQueryKeys, reviewFlashcard, type ReviewRating} from "@/entities/flashcard";
import FlashcardSide from "../../ui/flashcard/FlashcardSide.vue";
import FlashcardControls from "../../ui/flashcard/FlashcardControls.vue";
import RatingControls from "../../ui/flashcard/RatingControls.vue";
import type {DeckResponseDto} from "@/entities/deck";
import {queryClient} from "@/shared/api/queryClient.ts";
import {useI18n} from "vue-i18n";

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
  (e: "rated", flashcardId: number): void;
  (e: "previous"): void;
  (e: "next"): void;
}>();

const {t} = useI18n();

const isFlipped = ref(false);

const heading = computed(() =>
    `${props.deck.name}: ${t("resources.flashcard")} ${props.currentIdx + 1} of ${props.remaining}`);

function handleFlip() {
  isFlipped.value = !isFlipped.value;
}

async function handleRatingChange(rating: ReviewRating) {
  console.log({
    rating
  });
  const reviewedFlashcard = await reviewFlashcard(props.deck.id, props.flashcard.id, {
    rating
  });
  console.log(reviewedFlashcard);
  isFlipped.value = false;
  await queryClient.invalidateQueries({
    queryKey: flashcardsQueryKeys.byDeck(props.deck.id)
  });
  emit("rated", props.flashcard.id);
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