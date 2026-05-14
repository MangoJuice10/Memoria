<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {
  createUpdateFlashcardSchema,
  type CreateFlashcardDto,
  type UpdateFlashcardDto,
  flashcardsQueryKeys, type FlashcardResponseDto
} from "@/entities/flashcard";
import {Modal} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {flashcardsApi} from "@/entities/flashcard";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {codeToKey} from "@/shared/i18n";
import {formCodes} from "@/shared/config";

const props = defineProps<{
  id: number;
  front: string;
  back: string;
  deckId: number;
}>();

const {t} = useI18n();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const queryClient = useQueryClient();

const data = ref<CreateFlashcardDto>({
  front: props.front,
  back: props.back
});

const {
  isValid,
  getError,
  isFieldTouched,
  touch,
  touchAll,
  clientValidate,
  serverValidate,
  reset,
} = useValidation(data, createUpdateFlashcardSchema(t), {
  mode: "eager",
  delay: 300
});

const updateFlashcardMutation = useMutation({
  mutationFn: (updateFlashcardDto: UpdateFlashcardDto) => flashcardsApi.update(props.deckId, props.id, updateFlashcardDto),
  onSuccess: async (updatedFlashcard) => {
    await queryClient.setQueryData(
        flashcardsQueryKeys.byDeck(props.deckId),
        (old: FlashcardResponseDto[] | undefined) => {
          if (!old) return old;
          return old.map(flashcard => flashcard.id === updatedFlashcard.id ? updatedFlashcard : flashcard);
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
    await updateFlashcardMutation.mutateAsync(validatedData);
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
          form-error=""
          :is-submit-enabled="isValid"
          :is-reset-enabled="true"
          @submit="submit"
          @reset="reset">
        <template #heading>
          <h2 class="text-center">
            {{ $t("form.headings.update-flashcard") }}
          </h2>
        </template>
        <template #fields>
          <div class="flex flex-col gap-4">
            <FormField id="front"
                       v-model="data.front"
                       element="textarea"
                       :label="$t(codeToKey(formCodes.FRONT_NAME))"
                       :placeholder="$t(codeToKey(formCodes.FRONT_PLACEHOLDER))"
                       :touched="isFieldTouched('front')"
                       :error="getError('front')"
                       @blur="() => {
                         touch('front');
                         clientValidate();
                       }"/>
            <FormField id="back"
                       v-model="data.back"
                       element="textarea"
                       :label="$t(codeToKey(formCodes.BACK_NAME))"
                       :placeholder="$t(codeToKey(formCodes.BACK_PLACEHOLDER))"
                       :touched="isFieldTouched('back')"
                       :error="getError('back')"
                       @blur="() => {
                         touch('back');
                         clientValidate();
                       }"/>
          </div>
        </template>
        <template #submit>
          {{ $t("form.actions.update") }}
        </template>
      </Form>
    </div>
  </Modal>
</template>