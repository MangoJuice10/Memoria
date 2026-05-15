<script setup lang="ts">
import {ref} from "vue";
import {useValidation} from "@/shared/lib";
import {Form, FormField} from "@/shared/ui";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {codeToKey} from "@/shared/i18n";
import {formCodes, resourceCodes} from "@/shared/config";
import {createUpdateDeckSchema, type DeckResponseDto, type UpdateDeckDto} from "@/entities/deck";
import {decksQueryKeys} from "@/entities/deck";
import {decksApi} from "@/entities/deck";
import {useI18n} from "vue-i18n";

const props = defineProps<{
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
}>();

const data = ref<UpdateDeckDto>({
  name: props.name,
  description: props.description,
  isPublic: props.isPublic
});

const {t} = useI18n();
const queryClient = useQueryClient();

const {
  isValid,
  getError,
  isFieldTouched,
  touch,
  touchAll,
  clientValidate,
  serverValidate,
  reset,
} = useValidation(data, createUpdateDeckSchema(t), {
  mode: "eager",
  delay: 300
});

const updateDeckMutation = useMutation({
  mutationFn: (updateDeckDto: UpdateDeckDto) => decksApi.update(props.id, updateDeckDto),
  onSuccess: async (updatedDeck) => {
    await queryClient.setQueryData(
        decksQueryKeys.byId(props.id),
        (old: DeckResponseDto | undefined) => {
          if (!old) return old;
          return updatedDeck;
        }
    );
  }
});

const submit = async () => {
  touchAll();

  const validatedData = await clientValidate();
  if (!validatedData) return;

  try {
    await updateDeckMutation.mutateAsync(validatedData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
};
</script>

<template>
  <div class="">
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
                     v-model="data.name"
                     element="textarea"
                     :label="$t(codeToKey(formCodes.NAME_NAME))"
                     :placeholder="$t(codeToKey(formCodes.NAME_PLACEHOLDER))"
                     :touched="isFieldTouched('front')"
                     :error="getError('front')"
                     @blur="() => {
                         touch('front');
                         clientValidate();
                       }"/>
          <FormField id="back"
                     v-model="data.description"
                     element="textarea"
                     :label="$t(codeToKey(formCodes.DESCRIPTION_NAME))"
                     :placeholder="$t(codeToKey(formCodes.DESCRIPTION_PLACEHOLDER))"
                     :touched="isFieldTouched('back')"
                     :error="getError('back')"
                     @blur="() => {
                         touch('back');
                         clientValidate();
                       }"/>
        </div>
      </template>
      <template #submit>
        {{ $t(codeToKey(resourceCodes.DECK_UPDATE_CONFIRM)) }}
      </template>
    </Form>
  </div>
</template>