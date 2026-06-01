<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {asset, useValidation} from "@/shared/lib";
import {
  createUploadImageOptionalSchema,
  type UploadImageOptional,
  useBackdropStore,
  useModalStore,
  useToastStore
} from "@/shared/model";
import {FormError, Modal, UploadImage} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {allowedImageTypes, codes} from "@/shared/config";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {
  createCreateDeckMutation,
  createCreateDeckSchema,
  type CreateDeckDto, createUploadDeckCoverMutation,
} from "@/entities/deck";
import {codeToKey} from "@/shared/i18n";
import {MAX_DECK_COVER_SIZE} from "@/shared/config/files.config.ts";

const {t} = useI18n();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();

const data = ref<CreateDeckDto>({
  name: "",
  description: "",
  isPublic: false
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
} = useValidation(data, createCreateDeckSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const createDeckMutation = createCreateDeckMutation();
const uploadDeckCoverMutation = createUploadDeckCoverMutation();

const cover = ref<UploadImageOptional>({
  image: undefined,
});

const coverValidation = useValidation(cover, createUploadImageOptionalSchema(t, allowedImageTypes, MAX_DECK_COVER_SIZE));

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
    const {id} = await createDeckMutation.mutateAsync(result.data);
    if (coverResult.data.image) await uploadDeckCoverMutation.mutateAsync({
      deckId: id,
      file: coverResult.data.image
    });
    push(t(codeToKey(codes.DECK_CREATE_SUCCESS)), "success", "create");
    backdropStore.hide();
    modalStore.hide();
  } catch (error) {
    push(t(codeToKey(codes.DECK_CREATE_ERROR)), "error");
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
          :is-submit-enabled="isSubmitEnabled"
          :is-reset-enabled="true"
          has-sticky-controls
          form-error-classes="text-center"
          @submit="submit"
          @reset="reset">
        <template #heading>
          <h2 class="text-center">
            {{ $t(codeToKey(codes.DECK_CREATE_DESCRIPTION)) }}
          </h2>
        </template>
        <template #fields>
          <div class="flex flex-col gap-4">
            <FormField v-model="data.name"
                       id="name"
                       :label="t(codeToKey(codes.NAME_NAME))"
                       :placeholder="t(codeToKey(codes.NAME_PLACEHOLDER))"
                       :touched="isFieldTouched('name')"
                       :error="getError('name')"
                       @blur="() => {
                         touch('name');
                         clientValidate();
                       }"/>
            <FormField v-model="data.description"
                       variant="textarea"
                       id="name"
                       :label="t(codeToKey(codes.DESCRIPTION_NAME))"
                       :placeholder="t(codeToKey(codes.DESCRIPTION_PLACEHOLDER))"
                       :touched="isFieldTouched('description')"
                       :error="getError('description')"
                       @blur="() => {
                         touch('description');
                         clientValidate();
                       }"/>
            <div class="flex flex-col items-center gap-5">
              <UploadImage :default-img-url="asset('filler/noDeckCover.png')"
                           :img-size-rem="30"
                           @img-change="(file) => {
                             coverValidation.touch('image');
                             cover.image = file;
                             coverValidation.clientValidate();
                           }"
                           imgClasses="border border-dashed p-10 border-default"/>
              <FormError :error="coverValidation.getError('image')"/>
            </div>
          </div>
        </template>
        <template #submit>
          {{ $t(codeToKey(codes.DECK_CREATE_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>