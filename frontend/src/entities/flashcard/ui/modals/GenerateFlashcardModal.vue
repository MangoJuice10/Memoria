<script setup lang="ts">
import {useCreateFlashcardModalMenu} from "@/entities/flashcard/lib/use-create-flashcard-modal-menu.composable";
import {useI18n} from "vue-i18n";
import axios from "axios";
import {createGenerateFlashcardMutation} from "@/entities/flashcard/api/mutations/generate-flashcard.mutation";
import {
  createGenerateFlashcardSchema, type GenerateFlashcardDto,
} from "@/entities/flashcard/model/schemas/generate-flashcard.schema";
import type {ErrorResponse} from "@/shared/api";
import {onMounted, ref} from "vue";
import {useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {useDraftFlashcardStorage,} from "@/entities/flashcard";
import {Modal, TabLinks} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

const props = defineProps<{
  deckId: number;
}>();

const {t} = useI18n();

const {stageBulkCreate} = useDraftFlashcardStorage();
const {menuItemViews} = useCreateFlashcardModalMenu("generate-flashcard", t);
const {push} = useToastStore();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();

const data = ref<GenerateFlashcardDto>({
  instruction: "",
  count: 1
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
} = useValidation(data, createGenerateFlashcardSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const generateFlashcardMutation = createGenerateFlashcardMutation();

const submit = async () => {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  try {
    push(t(codeToKey(codes.FLASHCARD_GENERATE_PENDING)), "info", "pending");
    const generatedFlashcards = await generateFlashcardMutation.mutateAsync({
      deckId: props.deckId,
      generateFlashcardDto: result.data
    });
    stageBulkCreate(generatedFlashcards);
    push(t(codeToKey(codes.FLASHCARD_GENERATE_SUCCESS)), "success", "generate");
    backdropStore.hide();
    modalStore.hide();
  } catch (error) {
    push(t(codeToKey(codes.FLASHCARD_GENERATE_ERROR)), "error");
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
    <div class="min-w-[50vw] h-full p-10 overflow-y-auto">
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
                       :max="20"
                       :label="t(codeToKey(codes.COUNT_NAME))"
                       :touched="isFieldTouched('count')"
                       :error="getError('count')"
                       @blur="() => {
                         touch('count');
                         clientValidate();
                       }"/>
          </div>
        </template>
        <template #submit>
          {{ $t(codeToKey(codes.FLASHCARD_GENERATE_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>