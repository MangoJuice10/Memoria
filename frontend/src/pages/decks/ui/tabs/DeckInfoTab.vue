<script setup lang="ts">
import {computed, ref} from "vue";
import {asset, useValidation} from "@/shared/lib";
import {Form, FormError, FormField, UploadImage} from "@/shared/ui";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";
import {
  createUpdateDeckSchema,
  createUploadCoverSchema,
  type DeckResponseDto,
  type UpdateDeckDto, uploadCover
} from "@/entities/deck";
import {decksQueryKeys} from "@/entities/deck";
import {decksApi} from "@/entities/deck";
import {useI18n} from "vue-i18n";
import {useToastStore} from "@/shared/model";

const props = defineProps<{
  id: number;
  name: string;
  description: string;
  coverUrl: string | null;
}>();

const data = ref<UpdateDeckDto>({
  name: props.name,
  description: props.description,
});

const {t} = useI18n();
const {push} = useToastStore();
const queryClient = useQueryClient();

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
} = useValidation(data, createUpdateDeckSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const updateDeckDataMutation = useMutation({
  mutationFn: ({deckId, updateDeckDto}: {
    deckId: number;
    updateDeckDto: UpdateDeckDto;
  }) => decksApi.update(deckId, updateDeckDto),
  onSuccess: async (updatedDeck, variables) => {
    await queryClient.setQueryData(
        decksQueryKeys.byId(variables.deckId),
        (old: DeckResponseDto | undefined) => {
          if (!old) return old;
          return updatedDeck;
        }
    );
  }
});

const updateDeckCoverMutation = useMutation({
  mutationFn: ({deckId, file}: {
    deckId: number;
    file: File;
  }) => uploadCover(deckId, file),
  onSuccess: async (updatedDeck, variables) => {
    await queryClient.setQueryData(
        decksQueryKeys.byId(variables.deckId),
        (old: DeckResponseDto | undefined) => {
          if (!old) return old;
          return updatedDeck;
        }
    );
  }
});

const cover = ref<File | null>(null);

const coverValidation = useValidation(cover, createUploadCoverSchema(t));

const isSubmitEnabled = computed(() =>
    isFormTouched() && isValid.value
    || coverValidation.isFormTouched() && coverValidation.isValid.value
);

const submit = async () => {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  const coverResult = await coverValidation.clientValidate();
  if (!coverResult.success) return;

  try {
    await updateDeckDataMutation.mutateAsync({
      deckId: props.id,
      updateDeckDto: result.data
    });
    push(t(codeToKey(codes.DECK_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    push(t(codeToKey(codes.DECK_UPDATE_ERROR)), "error");
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }

  try {
    if (coverResult.data) await updateDeckCoverMutation.mutateAsync({
      deckId: props.id,
      file: coverResult.data
    });
    push(t(codeToKey(codes.DECK_COVER_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    push(t(codeToKey(codes.DECK_COVER_UPDATE_ERROR)), "error");
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
};
</script>

<template>
  <div class="mt-5">
    <Form :form-error="getFormError()"
          :is-submit-enabled="isSubmitEnabled"
          :is-reset-enabled="true"
          @submit="submit"
          @reset="reset"
          class="col-span-3
                   text-lg">
      <template #fields>
        <div class="w-fit">
          <h3 class="font-semibold mb-5">
            {{ $t(codeToKey(codes.DECK_COVER)) }}
          </h3>
          <div class="flex flex-col items-center gap-5
                      h-full">
            <UploadImage :img-url="coverUrl ?? asset('filler/noDeckCover.png')"
                         @img-change="(file) => {
                             coverValidation.touch('cover');
                             cover = file;
                             coverValidation.clientValidate();
                           }"
                         img-classes="border border-dashed p-10 border-default"
                         class="grow"/>
            <FormError :error="coverValidation.getError('cover')"/>
          </div>
        </div>
        <FormField id="front"
                   v-model="data.name"
                   element="input"
                   :label="$t(codeToKey(codes.NAME_NAME))"
                   :placeholder="$t(codeToKey(codes.NAME_PLACEHOLDER))"
                   :touched="isFieldTouched('front')"
                   :error="getError('front')"
                   @blur="() => {
                         touch('front');
                         clientValidate();
                       }"/>
        <FormField id="back"
                   v-model="data.description"
                   element="textarea"
                   :label="$t(codeToKey(codes.DESCRIPTION_NAME))"
                   :placeholder="$t(codeToKey(codes.DESCRIPTION_PLACEHOLDER))"
                   :touched="isFieldTouched('back')"
                   :error="getError('back')"
                   @blur="() => {
                         touch('back');
                         clientValidate();
                       }"
                   class="h-110"/>
      </template>
      <template #submit>
        {{ $t(codeToKey(codes.DECK_UPDATE_CONFIRM)) }}
      </template>
    </Form>
  </div>
</template>