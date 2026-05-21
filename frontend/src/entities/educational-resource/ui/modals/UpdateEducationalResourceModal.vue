<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {asset, useValidation} from "@/shared/lib";
import {createUploadImageSchema, useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {FormError, Modal, UploadImage} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {codeToKey} from "@/shared/i18n";
import {allowedImageTypes, codes, MAX_DECK_COVER_SIZE} from "@/shared/config";
import {
  createUpdateEducationalResourceSchema,
  type UpdateEducationalResourceDto
} from "../../model/update-educational-resource.schema";
import * as educationalResourcesApi from "../../api/educational-resources";
import {educationalResourcesQueryKeys} from "../../api/educational-resources-query-keys";
import {uploadCover} from "../../api/upload-cover";
import type {
  EducationalResourceResponseDto
} from "../../model/educational-resource-response.dto.ts";
import {removeCover} from "@/entities/educational-resource";

const props = defineProps<{
  id: number;
  name: string;
  description: string;
  coverUrl: string;
}>();

const {t} = useI18n();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();
const queryClient = useQueryClient();

const data = ref<UpdateEducationalResourceDto>({
  name: props.name,
  description: props.description,
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

const updateEducationalResourceMutation = useMutation({
  mutationFn: (updateEducationalResourceDto: UpdateEducationalResourceDto) => educationalResourcesApi.update(props.id, updateEducationalResourceDto),
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

const cover = ref<File | null>(null);

const coverValidation = useValidation(cover, createUploadImageSchema("cover", t, allowedImageTypes, MAX_DECK_COVER_SIZE));

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

const deleteEducationalResourceCoverMutation = useMutation({
  mutationFn: (educationalResourceId: number) => removeCover(educationalResourceId),
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
    await updateEducationalResourceMutation.mutateAsync(result.data);
    push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    push(t(codeToKey(codes.EDUCATIONAL_RESOURCE_UPDATE_ERROR)), "error");
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }

  if (coverResult.data) {
    try {
      await updateEducationalResourceCoverMutation.mutateAsync({
        educationalResourceId: props.id,
        file: coverResult.data
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
          :is-submit-enabled="isSubmitEnabled"
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
            <div class="w-fit">
              <h3 class="font-semibold mb-5">
                {{ $t(codeToKey(codes.EDUCATIONAL_RESOURCE_COVER)) }}
              </h3>
              <div class="flex flex-col items-center gap-5
                      h-full">
                <UploadImage :old-image-url="coverUrl"
                             :default-img-url="asset('filler/noEducationalResourceCover.png')"
                             @img-change="(file) => {
                             coverValidation.touch('cover');
                             cover = file;
                             coverValidation.clientValidate();
                           }"
                             img-classes="h-fit! p-10 border border-dashed border-default"
                             class="grow"/>
                <FormError :error="coverValidation.getError('cover')"/>
              </div>
            </div>
            <FormField id="front"
                       v-model="data.name"
                       element="textarea"
                       :label="$t(codeToKey(codes.NAME_NAME))"
                       :placeholder="$t(codeToKey(codes.NAME_PLACEHOLDER))"
                       :touched="isFieldTouched('name')"
                       :error="getError('name')"
                       @blur="() => {
                         touch('name');
                         clientValidate();
                       }"/>
            <FormField id="back"
                       v-model="data.description"
                       element="textarea"
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