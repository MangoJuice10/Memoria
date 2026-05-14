<script setup lang="ts">
import {useBackdropStore, useModalStore} from "@/shared/model";
import {ActionModal} from "@/shared/ui";
import {onMounted} from "vue";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {type FlashcardResponseDto, flashcardsApi, flashcardsQueryKeys} from "@/entities/flashcard";

const props = defineProps<{
  id: number;
  deckId: number;
}>();

const modalStore = useModalStore();
const backdropStore = useBackdropStore();
const queryClient = useQueryClient();

const deleteFlashcardMutation = useMutation({
  mutationFn: ({deckId, flashcardId}: {
    deckId: number;
    flashcardId: number
  }) => flashcardsApi.remove(deckId, flashcardId),
  onSuccess: async (_, variables) => {
    await queryClient.setQueryData(
        flashcardsQueryKeys.byDeck(variables.deckId),
        (old: FlashcardResponseDto[] | undefined) => {
          if (!old) return old;
          return old.filter(flashcard => flashcard.id !== variables.flashcardId);
        }
    );
    backdropStore.hide();
    modalStore.hide();
  }
});

async function handleConfirm() {
  await deleteFlashcardMutation.mutateAsync({
    deckId: props.deckId,
    flashcardId: props.id
  });
}

async function handleCancel() {
  backdropStore.hide();
  modalStore.hide();
}

onMounted(() => {
  backdropStore.setCallback(() => {
    modalStore.hide();
  });
});
</script>

<template>
  <ActionModal
      @confirm="handleConfirm"
      @cancel="handleCancel">
    <template #heading>
      {{ $t("modals.flashcard.delete.heading") }}
    </template>

    <template #content>
      {{ $t("modals.flashcard.delete.content") }}
    </template>

    <template #cancel>
      {{ $t("modals.flashcard.delete.buttons.cancel") }}
    </template>

    <template #confirm>
      {{ $t("modals.flashcard.delete.buttons.confirm") }}
    </template>
  </ActionModal>
</template>