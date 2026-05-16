<script setup lang="ts">
import {ref, watch} from "vue";
import {useValidation} from "@/shared/lib";
import {Form, FormField} from "@/shared/ui";
import axios from "axios";
import type {ErrorResponse} from "@/shared/api";
import {useMutation, useQueryClient} from "@tanstack/vue-query";
import {codeToKey} from "@/shared/i18n";
import {formCodes, resourceCodes, resourceNameActionPropertyCodes} from "@/shared/config";
import {createUpdateDeckSchema, type DeckResponseDto, type UpdateDeckDto} from "@/entities/deck";
import {decksQueryKeys} from "@/entities/deck";
import {decksApi} from "@/entities/deck";
import {useI18n} from "vue-i18n";
import {useToastStore} from "@/shared/model";

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
const {push} = useToastStore();
const queryClient = useQueryClient();

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
} = useValidation(data, createUpdateDeckSchema(t), {
  mode: "eager",
  delay: 300,
  t
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
    push(t(codeToKey(resourceNameActionPropertyCodes.DECK_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    push(t(codeToKey(resourceNameActionPropertyCodes.DECK_UPDATE_ERROR)), "error", "update");
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
};

watch(() => props.isPublic, (value) => {
  data.value.isPublic = value;
});
</script>

<template>
  <div class="mt-5">
    <Form
        :form-error="getFormError()"
        :is-submit-enabled="isValid"
        :is-reset-enabled="true"
        @submit="submit"
        @reset="reset"
        class="text-lg">
      <template #fields>
        <div class="flex flex-col gap-4">
          <FormField id="front"
                     v-model="data.name"
                     element="input"
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
                       }"
                     class="h-100"/>
        </div>
      </template>
      <template #submit>
        {{ $t(codeToKey(resourceCodes.DECK_UPDATE_CONFIRM)) }}
      </template>
    </Form>
  </div>
</template>