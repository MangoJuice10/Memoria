<script setup lang="ts">
import {useDraftFlashcardStorage} from "@/entities/flashcard";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {ActionModal} from "@/shared/ui";
import {onMounted} from "vue";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";
import {useI18n} from "vue-i18n";

const props = defineProps<{
  id: number
}>();

const {t} = useI18n();

const {stageDelete} = useDraftFlashcardStorage();
const modalStore = useModalStore();
const backdropStore = useBackdropStore();
const {push} = useToastStore();

async function handleConfirm() {
  stageDelete(props.id);
  push(t(codeToKey(codes.FLASHCARD_DELETE_DRAFT)), "success", "delete");
  backdropStore.hide();
  modalStore.hide();
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