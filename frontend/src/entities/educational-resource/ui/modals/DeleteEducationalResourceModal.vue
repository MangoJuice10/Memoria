<script setup lang="ts">
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {ActionModal} from "@/shared/ui";
import {onMounted} from "vue";
import {useMutation} from "@tanstack/vue-query";
import * as educationalResourcesApi from "../../api/educational-resources";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";
import {useI18n} from "vue-i18n";
import {queryClient} from "@/shared/api";
import {educationalResourcesQueryKeys} from "@/entities/educational-resource";
import type {
  EducationalResourceResponseDto
} from "@/entities/educational-resource/model/educational-resource-response.dto.ts";

const props = defineProps<{
  id: number;
}>();

const {t} = useI18n();
const modalStore = useModalStore();
const backdropStore = useBackdropStore();
const {push} = useToastStore();

const deleteEducationalResourceMutation = useMutation({
  mutationFn: (educationalResourceId: number) => educationalResourcesApi.remove(educationalResourceId),
  onSuccess: async (_, variables) => {
    await queryClient.setQueryData(
        educationalResourcesQueryKeys.all,
        (old: EducationalResourceResponseDto[] | undefined) => {
          if (!old) return old;
          return old.filter((educationalResource) => educationalResource.id !== variables);
        }
    );
    push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_DELETE_SUCCESS)), "success", "delete");
    backdropStore.hide();
    modalStore.hide();
  },
  onError: () => {
    push(t(codeToKey(codes.DECK_DELETE_ERROR)), "error");
  }
});

async function handleConfirm() {
  await deleteEducationalResourceMutation.mutateAsync(props.id);
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