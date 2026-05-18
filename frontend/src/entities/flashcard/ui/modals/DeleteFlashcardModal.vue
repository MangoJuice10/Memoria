<script setup lang="ts">
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {ActionModal} from "@/shared/ui";
import {onMounted} from "vue";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {type FlashcardResponseDto, flashcardsApi, flashcardsQueryKeys} from "@/entities/flashcard";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";
import {useI18n} from "vue-i18n";

const props = defineProps<{
  id: number;
  deckId: number;
}>();

const {t} = useI18n();

const modalStore = useModalStore();
const backdropStore = useBackdropStore();
const {push} = useToastStore();
const queryClient = useQueryClient();

const deleteFlashcardMutation = useMutation({
  mutationFn: ({deckId, flashcardId}: {
    deckId: number;
    flashcardId: number
  }) => flashcardsApi.remove(deckId, flashcardId),
  onSuccess: async (_, variables) => {
    push(t(codeToKey(codes.FLASHCARD_DELETE_SUCCESS)), "success", "delete");
    await queryClient.setQueryData(
        flashcardsQueryKeys.byDeck(variables.deckId),
        (old: FlashcardResponseDto[] | undefined) => {
          if (!old) return old;
          return old.filter(flashcard => flashcard.id !== variables.flashcardId);
        }
    );
    backdropStore.hide();
    modalStore.hide();
  },
  onError: () => push(t(codeToKey(codes.FLASHCARD_DELETE_ERROR)), "error")
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
      {{ $t(codeToKey(codes.FLASHCARD_DELETE_NAME)) }}
    </template>

    <template #content>
      {{ $t(codeToKey(codes.FLASHCARD_DELETE_DESCRIPTION)) }}
    </template>

    <template #cancel>
      {{ $t(codeToKey(codes.FLASHCARD_DELETE_CANCEL)) }}
    </template>

    <template #confirm>
      {{ $t(codeToKey(codes.FLASHCARD_DELETE_CONFIRM)) }}
    </template>
  </ActionModal>
</template>