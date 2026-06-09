<script setup lang="ts">
import {useUpdateFlashcardModalMenu} from "@/entities/flashcard/lib/use-update-flashcard-modal-menu.composable";
import {
  createRegenerateFlashcardSchema,
  type RegenerateFlashcardDto
} from "@/entities/flashcard/model/schemas/regenerate-flashcard.schema";
import type {ErrorResponse} from "@/shared/api";
import axios from "axios";
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useValidation} from "@/shared/lib";
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

const {menuItemViews} = useUpdateFlashcardModalMenu("regenerate-flashcard", props.flashcard, t);

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
  isFormTouched,
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

const regenerateFlashcardMutation = createRegenerateFlashcardMutation();

const isPending = computed(() => regenerateFlashcardMutation.isPending.value);

const isRegenerationEnabled = computed(() => isFormTouched() && isValid.value && !isPending.value);

async function submit() {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  try {
    push(t(codeToKey(codes.FLASHCARD_REGENERATE_PENDING)), "info", "pending");
    const regeneratedFlashcard = await regenerateFlashcardMutation.mutateAsync({
      deckId: props.flashcard.deckId,
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
          :is-submit-enabled="isRegenerationEnabled"
          :is-reset-enabled="true"
          has-sticky-controls
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