<script setup lang="ts">
import {UPDATE_FLASHCARD_LAYOUT} from "@/entities/flashcard/config/update-flashcard-layout.config";
import {
  createRegenerateFlashcardSchema,
  type RegenerateFlashcardDto
} from "@/entities/flashcard/model/schemas/regenerate-flashcard.schema";
import type {ErrorResponse} from "@/shared/api";
import axios from "axios";
import {defineAsyncComponent, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useMenu, useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {
  useDraftFlashcardStorage,
  createRegenerateFlashcardMutation, type DisplayFlashcard, type DraftCreatedFlashcard,
} from "@/entities/flashcard";
import {Modal, TabLinks} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

const props = defineProps<{
  flashcard: Exclude<DisplayFlashcard, DraftCreatedFlashcard>
}>();

const {t} = useI18n();
const {stageUpdate} = useDraftFlashcardStorage();

const {menuItemViews} = useMenu(UPDATE_FLASHCARD_LAYOUT, t, {
  "update-flashcard": switchToUpdateFlashcardModal
}, {
  "update-flashcard": false,
  "regenerate-flashcard": true,
  "split-flashcard": false,
});

const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();

const data = ref<RegenerateFlashcardDto>({
  instruction: ""
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
} = useValidation(data, createRegenerateFlashcardSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const regenerateFlashcardMutation = createRegenerateFlashcardMutation(props.flashcard.deckId);

const submit = async () => {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  try {
    push(t(codeToKey(codes.FLASHCARD_REGENERATE_PENDING)), "info", "pending");
    const regeneratedFlashcard = await regenerateFlashcardMutation.mutateAsync({
      flashcardId: props.flashcard.id,
      regenerateFlashcardDto: result.data
    });
    push(t(codeToKey(codes.FLASHCARD_REGENERATE_SUCCESS)), "success", "generate");
    stageUpdate(props.flashcard.id, {
      ...regeneratedFlashcard
    });
    backdropStore.hide();
    modalStore.hide();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
};

function switchToUpdateFlashcardModal() {
  const updateFlashcardModal = defineAsyncComponent(() => import("./UpdateFlashcardModal.vue"));
  modalStore.show(updateFlashcardModal, {
    flashcard: props.flashcard
  });
}

onMounted(() => {
  backdropStore.setCallback(() => {
    modalStore.hide();
  });
});

</script>

<template>
  <Modal>
    <div class="w-[50vw] p-10">
      <Form
          :form-error="getFormError()"
          :is-submit-enabled="isValid"
          :is-reset-enabled="true"
          form-error-classes="text-center"
          @submit="submit"
          @reset="reset">
        <template #heading>
          <TabLinks :menu-item-views
                    class="text-2xl"/>
        </template>
        <template #fields>
          <div class="flex flex-col gap-4">
            <FormField v-model="data.instruction"
                       variant="textarea"
                       id="instruction"
                       :label="$t(codeToKey(codes.INSTRUCTION_NAME))"
                       :placeholder="$t(codeToKey(codes.INSTRUCTION_PLACEHOLDER))"
                       :touched="isFieldTouched('instruction')"
                       :error="getError('instruction')"
                       @blur="() => {
                         touch('instruction');
                         clientValidate();
                       }"/>
          </div>
        </template>
        <template #submit>
          {{ $t(codeToKey(codes.FLASHCARD_REGENERATE_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>