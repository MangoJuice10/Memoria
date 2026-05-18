<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {Modal} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {codes} from "@/shared/config";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {createCreateDeckSchema, type CreateDeckDto, type DeckResponseDto, decksQueryKeys} from "@/entities/deck";
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

const createDeckMutation = useMutation({
  mutationFn: (createDeckDto: CreateDeckDto) => decksApi.create(createDeckDto),
  onSuccess: async (createdDeck) => {
    await queryClient.setQueryData(
        decksQueryKeys.all,
        (old: DeckResponseDto[] | undefined) => {
          if (!old) return old;
          return [...old, createdDeck];
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
    await createDeckMutation.mutateAsync(validatedData);
    push(t(codeToKey(codes.DECK_CREATE_SUCCESS)), "success", "create");
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
          </div>
        </template>
        <template #submit>
          {{ $t(codeToKey(codes.DECK_CREATE_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>