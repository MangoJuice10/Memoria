<script setup lang="ts">
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {ActionModal} from "@/shared/ui";
import {computed, onMounted} from "vue";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";
import {useI18n} from "vue-i18n";
import {createDeleteEducationalResourceMutation} from "@/entities/educational-resource";
import axios from "axios";

const props = defineProps<{
  id: number;
}>();

const {t} = useI18n();
const modalStore = useModalStore();
const backdropStore = useBackdropStore();
const {push} = useToastStore();

const deleteEducationalResourceMutation = createDeleteEducationalResourceMutation();

const isDeletionEnabled = computed(() => !deleteEducationalResourceMutation.isPending.value);

async function handleConfirm() {
  try {
    await deleteEducationalResourceMutation.mutateAsync(props.id);
    push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_DELETE_SUCCESS)), "success", "delete");
    backdropStore.hide();
    modalStore.hide();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_DELETE_ERROR)), "error");
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
      {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_DELETE_NAME)) }}
    </template>

    <template #content>
      {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_DELETE_DESCRIPTION)) }}
    </template>

    <template #cancel>
      {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_DELETE_CANCEL)) }}
    </template>

    <template #confirm>
      {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_DELETE_CONFIRM)) }}
    </template>
  </ActionModal>
</template>