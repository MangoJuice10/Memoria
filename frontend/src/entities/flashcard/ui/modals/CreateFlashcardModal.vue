<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {
  flashcardsApi,
  createCreateFlashcardSchema,
  type CreateFlashcardDto,
  flashcardsQueryKeys, type FlashcardResponseDto
} from "@/entities/flashcard";
import {Modal} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {codeToKey} from "@/shared/i18n";
import {formCodes, resourceCodes, resourceNameActionPropertyCodes} from "@/shared/config";

const props = defineProps<{
  deckId: number;
}>();

const {t} = useI18n();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();
const queryClient = useQueryClient();

const data = ref<CreateFlashcardDto>({
  front: "",
  back: ""
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
} = useValidation(data, createCreateFlashcardSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const createFlashcardMutation = useMutation({
  mutationFn: (createFlashcardDto: CreateFlashcardDto) => flashcardsApi.create(props.deckId, createFlashcardDto),
  onSuccess: async (createdFlashcard) => {
    await queryClient.setQueryData(
        flashcardsQueryKeys.byDeck(props.deckId),
        (old: FlashcardResponseDto[] | undefined) => {
          if (!old) return old;
          return [...old, createdFlashcard];
        }
    );
    backdropStore.hide();
    modalStore.hide();
  }
});

const submit = async () => {
  touchAll();

  const validatedData = await clientValidate();
  if (!validatedData) return;

  try {
    await createFlashcardMutation.mutateAsync(validatedData);
    push(t(codeToKey(resourceNameActionPropertyCodes.FLASHCARD_CREATE_SUCCESS)), "success", "create");
  } catch (error) {
    push(t(codeToKey(resourceNameActionPropertyCodes.FLASHCARD_CREATE_ERROR)), "error");
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
          :is-submit-enabled="isValid"
          :is-reset-enabled="true"
          form-error-classes="text-center"
          @submit="submit"
          @reset="reset">
        <template #heading>
          <h2 class="text-center">
            {{ $t("form.headings.create-flashcard") }}
          </h2>
        </template>
        <template #fields>
          <div class="flex flex-col gap-4">
            <FormField id="front"
                       v-model="data.front"
                       element="textarea"
                       :label="t(codeToKey(formCodes.FRONT_NAME))"
                       :placeholder="t(codeToKey(formCodes.FRONT_PLACEHOLDER))"
                       :touched="isFieldTouched('front')"
                       :error="getError('front')"
                       @blur="() => {
                         touch('front');
                         clientValidate();
                       }"/>
            <FormField id="back"
                       v-model="data.back"
                       element="textarea"
                       :label="t(codeToKey(formCodes.BACK_NAME))"
                       :placeholder="t(codeToKey(formCodes.BACK_PLACEHOLDER))"
                       :touched="isFieldTouched('back')"
                       :error="getError('back')"
                       @blur="() => {
                         touch('back');
                         clientValidate();
                       }"/>
          </div>
        </template>
        <template #submit>
          {{ $t(codeToKey(resourceCodes.FLASHCARD_CREATE_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>