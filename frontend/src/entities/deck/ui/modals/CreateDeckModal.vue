<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {asset, useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {FormError, Modal, UploadImage} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {codes} from "@/shared/config";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {
  createCreateDeckSchema,
  type CreateDeckDto,
  createUploadCoverSchema,
  type DeckResponseDto,
  decksQueryKeys, uploadCover
} from "@/entities/deck";
import {decksApi} from "@/entities/deck";
import {codeToKey} from "@/shared/i18n";

const {t} = useI18n();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();
const queryClient = useQueryClient();

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

const createDeckDataMutation = useMutation({
  mutationFn: (createDeckDto: CreateDeckDto) => decksApi.create(createDeckDto),
  onSuccess: async (createdDeck) => {
    await queryClient.setQueryData(
        decksQueryKeys.all,
        (old: DeckResponseDto[] | undefined) => {
          if (!old) return old;
          return [...old, createdDeck];
        }
    );
  }
});

const updateDeckCoverMutation = useMutation({
  mutationFn: ({deckId, file}: {
    deckId: number;
    file: File;
  }) => uploadCover(deckId, file),
  onSuccess: async (updatedDeck) => {
    await queryClient.setQueryData(
        decksQueryKeys.all,
        (old: DeckResponseDto[] | undefined) => {
          if (!old) return old;
          return [...old, updatedDeck];
        }
    );
  }
});

const cover = ref<File | null>(null);

const coverValidation = useValidation(cover, createUploadCoverSchema(t));

const isSubmitEnabled = computed(() =>
    isFormTouched() && isValid.value ||
    coverValidation.isFormTouched() || coverValidation.isValid.value
);

const submit = async () => {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  const coverResult = await coverValidation.clientValidate();
  if (!coverResult.success) return;

  try {
    const {id} = await createDeckDataMutation.mutateAsync(result.data);
    if (coverResult.data) await updateDeckCoverMutation.mutateAsync({
      deckId: id,
      file: coverResult.data
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
    <div class="w-[50vw] h-full p-10 overflow-auto">
      <Form
          :form-error="getFormError()"
          :is-submit-enabled="isSubmitEnabled"
          :is-reset-enabled="true"
          form-error-classes="text-center"
          form-controls-classes="absolute left-1/2 -translate-x-1/2 bottom-10
                                 w-8/10 p-5 border rounded-2xl border-default
                                 bg-(--color-primary)/85"
          @submit="submit"
          @reset="reset"
          class="mb-20">
        <template #heading>
          <h2 class="text-center">
            {{ $t(codeToKey(codes.DECK_CREATE_DESCRIPTION)) }}
          </h2>
        </template>
        <template #fields>
          <div class="flex flex-col gap-4">
            <FormField id="name"
                       v-model="data.name"
                       element="textarea"
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
            <div class="flex flex-col items-center gap-5">
              <UploadImage :img-url="asset('filler/noDeckCover.png')"
                           :img-size-rem="30"
                           @img-change="(file) => {
                             coverValidation.touch('cover');
                             cover = file;
                             coverValidation.clientValidate();
                           }"
                           class="border border-dashed p-10 border-default"/>
              <FormError :error="coverValidation.getError('cover')"/>
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