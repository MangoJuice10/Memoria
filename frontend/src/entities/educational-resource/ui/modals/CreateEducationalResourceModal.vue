<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {asset, useValidation} from "@/shared/lib";
import {createUploadImageSchema, useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {FormError, FormFieldError, Modal, UploadFile, UploadImage} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {allowedImageTypes, codes, MAX_EDUCATIONAL_RESOURCE_COVER_SIZE} from "@/shared/config";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import type {CreateEducationalResourceDto} from "../../model/create-educational-resource.schema";
import type {EducationalResourceResponseDto} from "../../model/educational-resource-response.dto";
import {educationalResourcesQueryKeys} from "../../api/educational-resources-query-keys";
import * as educationalResourcesApi from "../../api/educational-resources";
import {uploadCover} from "../../api/upload-cover";
import {codeToKey} from "@/shared/i18n";
import {
  type CreateEducationalResourceInput, createEducationalResourceSchema
} from "../../model/create-educational-resource.schema";

const {t} = useI18n();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();
const queryClient = useQueryClient();

const data = ref<CreateEducationalResourceInput>({
  name: "",
  description: "",
  file: null
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
} = useValidation(data, createEducationalResourceSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const createEducationalResourceMutation = useMutation({
  mutationFn: (createEducationalResourceDto: CreateEducationalResourceDto) => educationalResourcesApi.create(createEducationalResourceDto),
  onSuccess: async (createdEducationalResource) => {
    await queryClient.setQueryData(
        educationalResourcesQueryKeys.all,
        (old: EducationalResourceResponseDto[] | undefined) => {
          if (!old) return old;
          return [...old, createdEducationalResource];
        }
    );
  }
});

const cover = ref<File | null>(null);

const coverValidation = useValidation(cover, createUploadImageSchema("cover", t, allowedImageTypes, MAX_EDUCATIONAL_RESOURCE_COVER_SIZE));

const updateEducationalResourceCoverMutation = useMutation({
  mutationFn: ({educationalResourceId, file}: {
    educationalResourceId: number;
    file: File;
  }) => uploadCover(educationalResourceId, file),
  onSuccess: async (updatedEducationalResource) => {
    await queryClient.setQueryData(
        educationalResourcesQueryKeys.all,
        (old: EducationalResourceResponseDto[] | undefined) => {
          if (!old) return old;
          return old.map((educationalResource) => educationalResource.id === updatedEducationalResource.id ? updatedEducationalResource : educationalResource);
        }
    );
  }
});

const submit = async () => {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  const coverResult = await coverValidation.clientValidate();
  if (!coverResult.success) return;

  try {
    const {id} = await createEducationalResourceMutation.mutateAsync(result.data);
    if (coverResult.data) await updateEducationalResourceCoverMutation.mutateAsync({
      educationalResourceId: id,
      file: coverResult.data
    });
    push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_CREATE_SUCCESS)), "success", "create");
    backdropStore.hide();
    modalStore.hide();
  } catch (error) {
    push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_CREATE_ERROR)), "error");
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
          :is-submit-enabled="isFormTouched() && isValid"
          :is-reset-enabled="true"
          has-sticky-controls
          form-error-classes="text-center"
          @submit="submit"
          @reset="reset">
        <template #heading>
          <h2 class="text-center">
            {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_CREATE_DESCRIPTION)) }}
          </h2>
        </template>
        <template #fields>
          <div class="flex flex-col gap-10">
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
                          fileClasses="border border-dashed p-10 border-default"/>
              <FormFieldError :touched="isFieldTouched('file')" :error="getError('file')"/>
            </div>
            <FormField id="name"
                       v-model="data.name"
                       element="input"
                       :label="t(codeToKey(codes.NAME_NAME))"
                       :placeholder="t(codeToKey(codes.NAME_PLACEHOLDER))"
                       :touched="isFieldTouched('name')"
                       :error="getError('name')"
                       @blur="() => {
                         touch('name');
                         clientValidate();
                       }"/>
            <FormField id="back"
                       v-model="data.description"
                       element="textarea"
                       :label="t(codeToKey(codes.DESCRIPTION_NAME))"
                       :placeholder="t(codeToKey(codes.DESCRIPTION_PLACEHOLDER))"
                       :touched="isFieldTouched('description')"
                       :error="getError('description')"
                       @blur="() => {
                         touch('description');
                         clientValidate();
                       }"/>
            <div class="flex flex-col">
              <span class="font-semibold mb-5">
                {{ $t(codeToKey(codes.DECK_COVER)) }}
              </span>
              <div class="flex flex-col items-center gap-5">
                <UploadImage :default-img-url="asset('filler/noEducationalResourceCover.png')"
                             :img-size-rem="30"
                             @img-change="(file) => {
                             coverValidation.touch('cover');
                             cover = file;
                             coverValidation.clientValidate();
                           }"
                             imgClasses="h-fit! border border-dashed p-10 border-default"/>
                <FormError :error="coverValidation.getError('cover')"/>
              </div>
            </div>
          </div>
        </template>
        <template #submit>
          {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_CREATE_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>