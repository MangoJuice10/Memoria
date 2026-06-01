<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {
  useDraftFlashcardStorage,
  createUpdateFlashcardSchema,
  type CreateFlashcardDto, type FlashcardData,
} from "@/entities/flashcard";
import {Modal} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

const props = defineProps<{
  id: number;
  flashcardData: FlashcardData;
}>();

const {t} = useI18n();
const {stageUpdate} = useDraftFlashcardStorage();
const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();

const data = ref<CreateFlashcardDto>(props.flashcardData);

const {
  isValid,
  getError,
  getFormError,
  isFieldTouched,
  touch,
  touchAll,
  clientValidate,
  reset,
} = useValidation(data, createUpdateFlashcardSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const submit = async () => {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;
  stageUpdate(props.id, {
    ...props.flashcardData,
    ...result.data
  });
  push(t(codeToKey(codes.FLASHCARD_UPDATE_DRAFT)), "success", "update");
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
            {{ $t("form.headings.update-flashcard") }}
          </h2>
        </template>
        <template #fields>
          <div class="flex flex-col gap-4">
            <FormField v-model="data.front"
                       variant="textarea"
                       id="front"
                       :label="$t(codeToKey(codes.FRONT_NAME))"
                       :placeholder="$t(codeToKey(codes.FRONT_PLACEHOLDER))"
                       :touched="isFieldTouched('front')"
                       :error="getError('front')"
                       @blur="() => {
                         touch('front');
                         clientValidate();
                       }"/>
            <FormField v-model="data.back"
                       variant="textarea"
                       id="back"
                       :label="$t(codeToKey(codes.BACK_NAME))"
                       :placeholder="$t(codeToKey(codes.BACK_PLACEHOLDER))"
                       :touched="isFieldTouched('back')"
                       :error="getError('back')"
                       @blur="() => {
                         touch('back');
                         clientValidate();
                       }"/>
          </div>
        </template>
        <template #submit>
          {{ $t("form.actions.update") }}
        </template>
      </Form>
    </div>
  </Modal>
</template>