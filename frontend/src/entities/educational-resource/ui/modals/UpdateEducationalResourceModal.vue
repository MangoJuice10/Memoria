<script setup lang="ts">
import {
  createDeleteEducationalResourceCoverMutation,
  createUpdateEducationalResourceMutation,
  createUploadEducationalResourceCoverMutation,
} from "@/entities/educational-resource";
import type {ErrorResponse} from "@/shared/api";
import {allowedImageTypes, codes, MAX_DECK_COVER_SIZE} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import {asset, useValidation} from "@/shared/lib";
import {
  createUploadImageOptionalSchema,
  type UploadImageOptional,
  useBackdropStore,
  useModalStore,
  useToastStore
} from "@/shared/model";
import {Form, FormError, FormField, FormFieldError, Modal, UploadFile, UploadImage} from "@/shared/ui";
import axios from "axios";
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {
  createUpdateEducationalResourceSchema,
  type UpdateEducationalResourceInput,
} from "../../model/update-educational-resource.schema";

const props = defineProps<{
  id: number;
  name: string;
  description: string;
  coverUrl: string | null;
  originalFilename: string;
}>();

const {t} = useI18n();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();

const data = ref<UpdateEducationalResourceInput>({
  name: props.name,
  description: props.description,
  file: undefined
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
} = useValidation(data, createUpdateEducationalResourceSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const updateEducationalResourceMutation = createUpdateEducationalResourceMutation();

const cover = ref<UploadImageOptional>({
  image: undefined
});
const coverValidation = useValidation(cover, createUploadImageOptionalSchema(t, allowedImageTypes, MAX_DECK_COVER_SIZE));

const uploadEducationalResourceCoverMutation = createUploadEducationalResourceCoverMutation();
const deleteEducationalResourceCoverMutation = createDeleteEducationalResourceCoverMutation();

const isFormValid = computed(() => (
    isFormTouched() && isValid.value
    || coverValidation.isFormTouched() && coverValidation.isValid.value)
);

const isPending = computed(() =>
    updateEducationalResourceMutation.isPending.value
    || uploadEducationalResourceCoverMutation.isPending.value
    || deleteEducationalResourceCoverMutation.isPending.value
);

const isUpdateEnabled = computed(() =>
    isFormValid.value && !isPending.value
);

const submit = async () => {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  const coverResult = await coverValidation.clientValidate();
  if (!coverResult.success) return;

  try {
    await updateEducationalResourceMutation.mutateAsync({
      educationalResourceId: props.id,
      updateEducationalResourceDto: result.data
    });
    push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_UPDATE_ERROR)), "error");
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }

  if (coverResult.data.image) {
    try {
      await uploadEducationalResourceCoverMutation.mutateAsync({
        educationalResourceId: props.id,
        file: coverResult.data.image
      });
      push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_COVER_UPDATE_SUCCESS)), "success", "update");
    } catch (error) {
      push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_COVER_UPDATE_ERROR)), "error");
      if (axios.isAxiosError(error)) {
        const body = error.response?.data as ErrorResponse;
        await coverValidation.serverValidate(body);
      }
    }
  } else {
    try {
      await deleteEducationalResourceCoverMutation.mutateAsync(props.id);
      push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_COVER_DELETE_SUCCESS)), "success", "delete");
    } catch (error) {
      push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_COVER_DELETE_ERROR)), "error");
      if (axios.isAxiosError(error)) {
        const body = error.response?.data as ErrorResponse;
        await coverValidation.serverValidate(body);
      }
    }
  }
  backdropStore.hide();
  modalStore.hide();
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
          :is-submit-enabled="isUpdateEnabled"
          :is-reset-enabled="true"
          has-sticky-controls
          form-error-classes="text-center"
          @submit="submit"
          @reset="reset">
        <template #heading>
          <h2 class="text-center">
            {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_UPDATE_NAME)) }}
          </h2>
        </template>
        <template #fields>
          <div class="flex flex-col gap-4">
            <span class="font-semibold">
              {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_FILE)) }}
            </span>
            <div class="flex flex-col items-center gap-5
                        w-fit">
              <UploadFile @file-change="(file) => {
                             touch('file');
                             data.file = file;
                             clientValidate();
                          }"
                          :old-filename="originalFilename"
                          fileClasses="border border-dashed p-10 border-default"/>
              <FormFieldError :touched="isFieldTouched('file')" :error="getError('file')"/>
            </div>
            <div class="flex flex-col w-fit">
              <span class="font-semibold mb-5">
                {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_COVER)) }}
              </span>
              <div class="flex flex-col items-center gap-5
                      h-full">
                <UploadImage :old-image-url="coverUrl"
                             :default-img-url="asset('filler/noEducationalResourceCover.png')"
                             @img-change="(file) => {
                             coverValidation.touch('cover');
                             cover.image = file;
                             coverValidation.clientValidate();
                           }"
                             img-classes="h-fit! p-10 border border-dashed border-default"
                             class="grow"/>
                <FormError :error="coverValidation.getError('cover')"/>
              </div>
            </div>
            <FormField v-model="data.name"
                       id="front"
                       :label="$t(codeToKey(codes.NAME_NAME))"
                       :placeholder="$t(codeToKey(codes.NAME_PLACEHOLDER))"
                       :touched="isFieldTouched('name')"
                       :error="getError('name')"
                       @blur="() => {
                         touch('name');
                         clientValidate();
                       }"/>
            <FormField v-model="data.description"
                       variant="textarea"
                       id="back"
                       :label="$t(codeToKey(codes.DESCRIPTION_NAME))"
                       :placeholder="$t(codeToKey(codes.DESCRIPTION_PLACEHOLDER))"
                       :touched="isFieldTouched('description')"
                       :error="getError('description')"
                       @blur="() => {
                         touch('description');
                         clientValidate();
                       }"/>
          </div>
        </template>
        <template #submit>
          {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_UPDATE_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>