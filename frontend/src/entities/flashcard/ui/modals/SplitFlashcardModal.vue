<script setup lang="ts">
import {createSplitFlashcardMutation} from "@/entities/flashcard/api/mutations/split-flashcard.mutation";
import {UPDATE_FLASHCARD_LAYOUT} from "@/entities/flashcard/config/update-flashcard-layout.config";
import {useUpdateFlashcardModalMenu} from "@/entities/flashcard/lib/use-update-flashcard-modal-menu.composable";
import {
  createSplitFlashcardSchema,
  type SplitFlashcardDto
} from "@/entities/flashcard/model/schemas/split-flashcard.schema";
import type {ErrorResponse} from "@/shared/api";
import axios from "axios";
import {defineAsyncComponent, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useMenu, useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {
  useDraftFlashcardStorage,
  type DisplayFlashcard, type DraftCreatedFlashcard,
} from "@/entities/flashcard";
import {Modal, TabLinks} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

const props = defineProps<{
  flashcard: Exclude<DisplayFlashcard, DraftCreatedFlashcard>
}>();

const {t} = useI18n();
const {stageDelete, stageBulkCreate} = useDraftFlashcardStorage();

const {menuItemViews} = useUpdateFlashcardModalMenu("split-flashcard", props.flashcard, t);

const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();

const data = ref<SplitFlashcardDto>({
  instruction: undefined,
  count: 2,
});

const {
  isValid,
  getError,
  getFormError,
  isFieldTouched,
  touch,
  touchAll,
  clientValidate,
  serverValidate,
  reset,
} = useValidation(data, createSplitFlashcardSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const splitFlashcardMutation = createSplitFlashcardMutation();

const submit = async () => {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  try {
    push(t(codeToKey(codes.FLASHCARD_SPLIT_PENDING)), "info", "pending");
    const splitFlashcards = await splitFlashcardMutation.mutateAsync({
      deckId: props.flashcard.deckId,
      flashcardId: props.flashcard.id,
      splitFlashcardDto: result.data
    });
    push(t(codeToKey(codes.FLASHCARD_SPLIT_SUCCESS)), "success", "generate");
    stageDelete(props.flashcard.id);
    stageBulkCreate(splitFlashcards);
    backdropStore.hide();
    modalStore.hide();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
};

onMounted(() => {
  backdropStore.setCallback(() => {
    modalStore.hide();
  });
});

</script>

<template>
  <Modal>
    <div class="min-w-[50vw] h-full p-10 overflow-auto">
      <Form
          :form-error="getFormError()"
          :is-submit-enabled="isValid"
          :is-reset-enabled="true"
          has-sticky-controls
          form-error-classes="text-center"
          @submit="submit"
          @reset="reset">
        <template #heading>
          <div class="flex justify-center">
            <TabLinks :menu-item-views
                      class="text-2xl"/>
          </div>
        </template>
        <template #fields>
          <div class="flex flex-col gap-4">
            <FormField variant="textarea"
                       id="front"
                       v-model="data.instruction"
                       :label="t(codeToKey(codes.INSTRUCTION_NAME))"
                       :placeholder="t(codeToKey(codes.INSTRUCTION_PLACEHOLDER))"
                       :touched="isFieldTouched('instruction')"
                       :error="getError('instruction')"
                       @blur="() => {
                         touch('instruction');
                         clientValidate();
                       }"/>
            <FormField id="count-range"
                       variant="range-number"
                       v-model.number="data.count"
                       :min="2"
                       :max="5"
                       :label="t(codeToKey(codes.COUNT_NAME))"
                       :touched="isFieldTouched('count')"
                       :error="getError('count')"
                       optional
                       @blur="() => {
                         touch('count');
                         clientValidate();
                       }"/>
          </div>
        </template>
        <template #submit>
          {{ $t(codeToKey(codes.FLASHCARD_SPLIT_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>