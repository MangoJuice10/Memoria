<script setup lang="ts">
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {ActionModal} from "@/shared/ui";
import {onMounted} from "vue";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";
import {useI18n} from "vue-i18n";
import {createDeleteChatMutation} from "@/entities/chat";
import axios from "axios";

const props = defineProps<{
  chatId: number;
}>();

const {t} = useI18n();

const modalStore = useModalStore();
const backdropStore = useBackdropStore();
const {push} = useToastStore();

const deleteChatMutation = createDeleteChatMutation();

async function handleConfirm() {
  try {
    await deleteChatMutation.mutateAsync(props.chatId);
    push(t(codeToKey(codes.CHAT_DELETE_SUCCESS)), "success", "delete");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      push(t(codeToKey(codes.CHAT_MESSAGE_DELETE_ERROR)), "error");
    }
  }
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