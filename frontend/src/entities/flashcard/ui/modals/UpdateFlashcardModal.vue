<script setup lang="ts">
import {useUpdateFlashcardModalMenu} from "@/entities/flashcard/lib/use-update-flashcard-modal-menu.composable";
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {createUpdateFlashcardSchema} from "../../model/schemas/update-flashcard.schema";
import {useDraftFlashcardStorage} from "../../model/use-draft-flashcard-storage.composable";
import type {CreateFlashcardDto} from "../../model/schemas/create-flashcard.schema";
import type {DisplayFlashcard} from "../../model/types/display-flashcard.type";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";
import {Modal, TabLinks} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";

const props = defineProps<{
  flashcard: DisplayFlashcard
}>();

const {t} = useI18n();
const {stageUpdate} = useDraftFlashcardStorage();

const {menuItemViews} = useUpdateFlashcardModalMenu("update-flashcard", props.flashcard, t);

const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();

const data = ref<CreateFlashcardDto>({
  front: props.flashcard.front,
  back: props.flashcard.back,
});

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
  stageUpdate(props.flashcard.id, {
    front: props.flashcard.front,
    back: props.flashcard.back,
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
    <div class="w-[50vw] h-full p-10 overflow-y-auto">
      <Form
          :form-error="getFormError()"
          :is-submit-enabled="isValid"
          :is-reset-enabled="true"
          has-sticky-controls
          form-error-classes="text-center"
          @submit="submit"
          @reset="reset">
        <template #heading>
          <div class="flex justify-center items-center">
            <TabLinks :menu-item-views
                      class="text-2xl"/>
          </div>
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
          {{ $t(codeToKey(codes.FLASHCARD_UPDATE_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>