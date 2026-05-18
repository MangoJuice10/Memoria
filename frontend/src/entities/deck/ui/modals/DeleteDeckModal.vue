<script setup lang="ts">
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {ActionModal} from "@/shared/ui";
import {onMounted} from "vue";
import {useMutation} from "@tanstack/vue-query";
import {decksApi} from "@/entities/deck";
import {useRoute, useRouter} from "vue-router";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";
import {useI18n} from "vue-i18n";

const props = defineProps<{
  id: number;
}>();

const router = useRouter();
const route = useRoute();
const {t} = useI18n();
const modalStore = useModalStore();
const backdropStore = useBackdropStore();
const {push} = useToastStore();

const deleteDeckMutation = useMutation({
  mutationFn: (deckId: number) => decksApi.remove(deckId),
  onSuccess: async () => {
    push(t(codeToKey(codes.DECK_DELETE_SUCCESS)), "success", "delete");
    backdropStore.hide();
    modalStore.hide();
    await router.push({
      name: "decks",
      params: route.params,
      query: route.query,
      hash: route.hash,
    });
  },
  onError: () => {
    push(t(codeToKey(codes.DECK_DELETE_ERROR)), "error");
  }
});

async function handleConfirm() {
  await deleteDeckMutation.mutateAsync(props.id);
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
      {{ $t(codeToKey(codes.DECK_DELETE_NAME)) }}
    </template>

    <template #content>
      {{ $t(codeToKey(codes.DECK_DELETE_DESCRIPTION)) }}
    </template>

    <template #cancel>
      {{ $t(codeToKey(codes.DECK_DELETE_CANCEL)) }}
    </template>

    <template #confirm>
      {{ $t(codeToKey(codes.DECK_DELETE_CONFIRM)) }}
    </template>
  </ActionModal>
</template>