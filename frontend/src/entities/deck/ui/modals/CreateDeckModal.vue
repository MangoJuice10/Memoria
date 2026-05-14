<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {Modal} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {
  formCodes,
  resourceCodes,
  resourceNameActionPropertyCodes
} from "@/shared/config";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {createCreateDeckSchema, type CreateDeckDto, type DeckResponseDto, decksQueryKeys} from "@/entities/deck";
import {decksApi} from "@/entities/deck";
import {codeToKey} from "@/shared/i18n";

const {t} = useI18n();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const queryClient = useQueryClient();

const data = ref<CreateDeckDto>({
  name: "",
  description: "",
  isPublic: false
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
} = useValidation(data, createCreateDeckSchema(t), {
  mode: "eager",
  delay: 300
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
            {{ $t(codeToKey(resourceNameActionPropertyCodes.DECK_CREATE_DESCRIPTION)) }}
          </h2>
        </template>
        <template #fields>
          <div class="flex flex-col gap-4">
            <FormField id="name"
                       v-model="data.name"
                       element="textarea"
                       :label="t(codeToKey(formCodes.NAME_NAME))"
                       :placeholder="t(codeToKey(formCodes.NAME_PLACEHOLDER))"
                       :touched="isFieldTouched('front')"
                       :error="getError('front')"
                       @blur="() => {
                         touch('front');
                         clientValidate();
                       }"/>
            <FormField id="back"
                       v-model="data.description"
                       element="textarea"
                       :label="t(codeToKey(formCodes.DESCRIPTION_NAME))"
                       :placeholder="t(codeToKey(formCodes.DESCRIPTION_PLACEHOLDER))"
                       :touched="isFieldTouched('back')"
                       :error="getError('back')"
                       @blur="() => {
                         touch('back');
                         clientValidate();
                       }"/>
          </div>
        </template>
        <template #submit>
          {{ $t(codeToKey(resourceCodes.DECK_CREATE_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>