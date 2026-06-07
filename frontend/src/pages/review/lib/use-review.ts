import {computed, type MaybeRefOrGetter, ref, toValue, watch} from "vue";
import type {FlashcardResponseDto} from "@/entities/flashcard";

export function useReview(flashcardsSource: MaybeRefOrGetter<FlashcardResponseDto[] | undefined>) {
    const flashcards = ref<FlashcardResponseDto[]>([]);
    const currentIdx = ref(0);

    watch(() => toValue(flashcardsSource), initialFlashcards => {
        flashcards.value = initialFlashcards ? [...initialFlashcards] : [];
        currentIdx.value = 0;
    }, {immediate: true});

    const currentFlashcard = computed(() => flashcards.value[currentIdx.value] ?? null);
    const remaining = computed(() => flashcards.value.length);
    const isFirst = computed(() => currentIdx.value === 0);
    const isLast = computed(() => currentIdx.value === flashcards.value.length - 1);

    const previous = () => {
        if (!isFirst.value) currentIdx.value--;
    };

    const next = () => {
        if (!isLast.value) currentIdx.value++;
    };

    const assessReviewedFlashcard = (reviewedFlashcard: FlashcardResponseDto) => {
        const flashcardIdx = flashcards.value.findIndex(flashcard => flashcard.id === reviewedFlashcard.id);
        if (flashcardIdx === -1) return;

        flashcards.value.splice(flashcardIdx, 1);

        const now = new Date();
        const dueAt = new Date(reviewedFlashcard.dueAt);
        const isReviewedFlashcardDue = dueAt <= now;

        if (isReviewedFlashcardDue) flashcards.value.push(reviewedFlashcard);

        if (currentIdx.value >= flashcards.value.length) currentIdx.value = Math.max(0, flashcards.value.length - 1);
    };

    return {
        flashcards,
        currentIdx,
        currentFlashcard,
        remaining,
        isFirst,
        isLast,
        previous,
        next,
        assessReviewedFlashcard
    };
}