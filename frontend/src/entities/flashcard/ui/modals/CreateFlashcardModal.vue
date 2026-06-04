<script setup lang="ts">
import {useCreateFlashcardModalMenu} from "@/entities/flashcard/lib/use-create-flashcard-modal-menu.composable";
import {CREATE_FLASHCARD_LAYOUT} from "../../config/create-flashcard-layout.config";
import {defineAsyncComponent, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useMenu, useValidation} from "@/shared/lib";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {
  createCreateFlashcardSchema,
  type CreateFlashcardDto, useDraftFlashcardStorage,
} from "@/entities/flashcard";
import {Modal, TabLinks} from "@/shared/ui";
import {Form, FormField} from "@/shared/ui";
import {codeToKey} from "@/shared/i18n";
import {codes} from "@/shared/config";

const props = defineProps<{
  deckId: number;
}>();

const {t} = useI18n();

const {stageCreate} = useDraftFlashcardStorage();
const {menuItemViews} = useCreateFlashcardModalMenu("create-flashcard", t);

const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();

const data = ref<CreateFlashcardDto>({
  front: "",
  back: ""
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
} = useValidation(data, createCreateFlashcardSchema(t), {
  mode: "eager",
  delay: 300,
  t
});

const submit = async () => {
  touchAll();

  const result = await clientValidate();
  if (!result.success) return;

  stageCreate(result.data);
  push(t(codeToKey(codes.FLASHCARD_CREATE_DRAFT)), "success", "create");
  backdropStore.hide();
  modalStore.hide();
};

function switchToGenerateFlashcardModal() {
  const generateFlashcardModal = defineAsyncComponent(() => import("./GenerateFlashcardModal.vue"));
  modalStore.show(generateFlashcardModal, {
    deckId: props.deckId
  });
};

onMounted(() => {
  backdropStore.setCallback(() => {
    modalStore.hide();
  });
});

</script>

<template>
  <Modal>
    <div class="min-w-[50vw] h-full p-10 overflow-y-auto">
      <Form
          :form-error="getFormError()"
          :is-submit-enabled="isValid"
          :is-reset-enabled="true"
          has-sticky-controls
          form-error-classes="text-center"
          @submit="submit"
          @reset="reset">
        <template #heading>
          <div class="flex justify-center">
            <TabLinks :menu-item-views
                      class="text-2xl"/>
          </div>
        </template>
        <template #fields>
          <div class="flex flex-col gap-4">
            <FormField v-model="data.front"
                       variant="textarea"
                       id="front"
                       :label="t(codeToKey(codes.FRONT_NAME))"
                       :placeholder="t(codeToKey(codes.FRONT_PLACEHOLDER))"
                       :touched="isFieldTouched('front')"
                       :error="getError('front')"
                       @blur="() => {
                         touch('front');
                         clientValidate();
                       }"/>
            <FormField v-model="data.back"
                       variant="textarea"
                       id="back"
                       :label="t(codeToKey(codes.BACK_NAME))"
                       :placeholder="t(codeToKey(codes.BACK_PLACEHOLDER))"
                       :touched="isFieldTouched('back')"
                       :error="getError('back')"
                       @blur="() => {
                         touch('back');
                         clientValidate();
                       }"/>
          </div>
        </template>
        <template #submit>
          {{ $t(codeToKey(codes.FLASHCARD_CREATE_NAME)) }}
        </template>
      </Form>
    </div>
  </Modal>
</template>