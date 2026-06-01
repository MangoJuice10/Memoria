<script setup lang="ts">
import {computed, ref} from "vue";
import {asset, useValidation} from "@/shared/lib";
import {Form, FormError, FormField, UploadImage} from "@/shared/ui";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {codeToKey} from "@/shared/i18n";
import {allowedImageTypes, codes, MAX_DECK_COVER_SIZE} from "@/shared/config";
import {
  createUpdateDeckSchema,
  createDeleteDeckMutation,
  createUpdateDeckMutation,
  createUploadDeckCoverMutation,
  type UpdateDeckDto
} from "@/entities/deck";
import {useI18n} from "vue-i18n";
import {createUploadImageOptionalSchema, type UploadImageOptional, useToastStore} from "@/shared/model";

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

const updateDeckMutation = createUpdateDeckMutation();
const deleteDeckMutation = createDeleteDeckMutation();

const cover = ref<UploadImageOptional>({
  image: undefined
});

const coverValidation = useValidation(cover, createUploadImageOptionalSchema(t, allowedImageTypes, MAX_DECK_COVER_SIZE));

const updateDeckCoverMutation = createUploadDeckCoverMutation();

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
    await updateDeckMutation.mutateAsync({
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

  if (coverResult.data.image) {
    try {
      await updateDeckCoverMutation.mutateAsync({
        deckId: props.id,
        file: coverResult.data.image
      });
      push(t(codeToKey(codes.DECK_COVER_UPDATE_SUCCESS)), "success", "update");
    } catch (error) {
      push(t(codeToKey(codes.DECK_COVER_UPDATE_ERROR)), "error");
      if (axios.isAxiosError(error)) {
        const body = error.response?.data as ErrorResponse;
        await coverValidation.serverValidate(body);
      }
    }
  } else {
    try {
      await deleteDeckMutation.mutateAsync(props.id);
      push(t(codeToKey(codes.DECK_COVER_DELETE_SUCCESS)), "success", "update");
    } catch (error) {
      push(t(codeToKey(codes.DECK_COVER_DELETE_ERROR)), "error");
      if (axios.isAxiosError(error)) {
        const body = error.response?.data as ErrorResponse;
        await coverValidation.serverValidate(body);
      }
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
            <UploadImage :old-image-url="coverUrl"
                         :default-img-url="asset('filler/noDeckCover.png')"
                         @img-change="(file) => {
                             coverValidation.touch('image');
                             cover.image = file;
                             coverValidation.clientValidate();
                           }"
                         img-classes="p-10 border border-dashed border-default"
                         class="grow"/>
            <FormError :error="coverValidation.getError('image')"/>
          </div>
        </div>
        <FormField v-model="data.name"
                   id="front"
                   :label="$t(codeToKey(codes.NAME_NAME))"
                   :placeholder="$t(codeToKey(codes.NAME_PLACEHOLDER))"
                   :touched="isFieldTouched('front')"
                   :error="getError('front')"
                   @blur="() => {
                         touch('front');
                         clientValidate();
                       }"/>
        <FormField v-model="data.description"
                   variant="textarea"
                   id="back"
                   :label="$t(codeToKey(codes.DESCRIPTION_NAME))"
                   :placeholder="$t(codeToKey(codes.DESCRIPTION_PLACEHOLDER))"
                   :touched="isFieldTouched('back')"
                   :error="getError('back')"
                   @blur="() => {
                         touch('back');
                         clientValidate();
                       }"
                   inputClasses="h-110"/>
      </template>
      <template #submit>
        {{ $t(codeToKey(codes.DECK_UPDATE_CONFIRM)) }}
      </template>
    </Form>
  </div>
</template>