<script setup lang="ts">
import {defineAsyncComponent, ref} from "vue";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import axios from "axios";
import {createBatchFlashcardDto, createBatchFlashcardMutation, useDraftFlashcardStorage} from "@/entities/flashcard";
import {FormError, IconButton, IconLabel, SaveIcon, TabLinks, Toggle, TrashIcon} from "@/shared/ui";
import {DeckIcon} from "@/shared/ui/icons";
import {codeToKey} from "@/shared/i18n";
import {codes, type MenuItemIsActive, type TabItemId} from "@/shared/config";
import {showOne, useMenu, useNavigation, useValidation} from "@/shared/lib";
import {DECK_LAYOUT} from "../config/deck-layout";
import {createUpdateDeckMutation} from "@/entities/deck";
import {createUpdateDeckSchema, type UpdateDeckDto} from "@/entities/deck";
import {type ErrorResponse} from "@/shared/api";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";

const props = defineProps<{
  id: number;
  name: string;
  isPublic: boolean;
}>();

const data = ref<UpdateDeckDto>({
  isPublic: props.isPublic,
});

const {t} = useI18n();

const draftFlashcardsStore = useDraftFlashcardStorage();
const {draftFlashcards} = storeToRefs(draftFlashcardsStore);
const {init, clear} = draftFlashcardsStore;
init(props.id);

const backdropStore = useBackdropStore();
const modalStore = useModalStore();
const {push} = useToastStore();

const {isNavigationLinkActive} = useNavigation();
const isActives = DECK_LAYOUT.menuItems.reduce((acc, menuItem) => {
  acc[menuItem.id] = () => isNavigationLinkActive(menuItem);
  return acc;
}, {} as Record<TabItemId, MenuItemIsActive>);
const {menuItemViews} = useMenu(DECK_LAYOUT, t, {}, isActives);

const {
  getFormError,
  clientValidate,
  serverValidate
} = useValidation(data, createUpdateDeckSchema(t), {
  mode: "lazy",
  t
});

const updateDeckMutation = createUpdateDeckMutation();

const batchFlashcardMutation = createBatchFlashcardMutation();

const openDeleteDeckModal = () => {
  const deleteDeckModal = defineAsyncComponent(() => import("@/entities/deck/ui/modals/DeleteDeckModal.vue"));
  showOne(backdropStore);
  modalStore.show(deleteDeckModal, {
    id: props.id
  });
};

async function handleSave() {
  try {
    await batchFlashcardMutation.mutateAsync({
      deckId: props.id,
      batchFlashcardDto: createBatchFlashcardDto(draftFlashcards.value)
    });
    clear();
    push(t(codeToKey(codes.FLASHCARD_BATCH_SUCCESS)), "success", "batch");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      push(t(codeToKey(codes.FLASHCARD_BATCH_ERROR)), "error");
    }
  }
}

async function submit() {
  const result = await clientValidate();
  if (!result.success) return;

  try {
    await updateDeckMutation.mutateAsync({
      deckId: props.id,
      updateDeckDto: result.data
    });
    push(t(codeToKey(codes.DECK_UPDATE_SUCCESS)), "success", "update");
  } catch (error) {
    push(t(codeToKey(codes.DECK_UPDATE_ERROR)), "error");
    if (axios.isAxiosError(error)) {
      const body = error.response?.data as ErrorResponse;
      await serverValidate(body);
    }
  }
}
</script>

<template>
  <div class="flex justify-between
              py-4 border-b border-default
              bg-(--color-tertiary)/60 shadow-xl backdrop-blur">
    <div class="flex items-center gap-6">
      <IconLabel class="gap-2.5">
        <template #label>
          <span class="text-xl font-semibold">
            {{ name }}
          </span>
        </template>
        <template #icon>
          <DeckIcon class="w-8"/>
        </template>
      </IconLabel>
      <Toggle v-model:is-on="data.isPublic"
              class="grow
                     h-10"
              @click="submit">
        <template #on>
          <span class="text-lg font-semibold">
            {{ $t(codeToKey(codes.DECK_PRIVATE)) }}
          </span>
        </template>
        <template #off>
          <span class="text-lg font-semibold">
            {{ $t(codeToKey(codes.DECK_PUBLIC)) }}
          </span>
        </template>
      </Toggle>
      <IconButton :size-rem="2.3"
                  :enabled="!!draftFlashcards.length"
                  :class="!!draftFlashcards.length && 'animate-subtle-bounce'"
                  @click="handleSave">
        <SaveIcon/>
      </IconButton>
      <IconButton v-if="$route.name === 'deck-info'"
                  :size-rem="2"
                  color-hover-primary="var(--color-primary)"
                  color-active-primary="var(--color-primary)"
                  color-hover-secondary="var(--color-surface-danger)"
                  color-active-secondary="var(--color-surface-danger)"
                  :scale-hover="1.15"
                  :scale-active="1.2"
                  @click="openDeleteDeckModal"
                  class="mb-1">
        <TrashIcon/>
      </IconButton>
      <FormError :error="getFormError()"
                 class="text-base"/>
    </div>
    <TabLinks :menu-item-views
              class="text-lg"/>
  </div>
</template>

<style scoped>
@keyframes subtle-bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-subtle-bounce {
  animation: subtle-bounce 2s linear infinite;
}
</style>