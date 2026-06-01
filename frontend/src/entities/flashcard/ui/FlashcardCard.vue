<script setup lang="ts">
import {useDraftFlashcardStorage} from "@/entities/flashcard";
import {createFlashcardsOptionsLayout} from "@/entities/flashcard/config/flashcard-options-layout.config";
import {ClockIcon, DropdownMenu} from "@/shared/ui";
import {IconLabel} from "@/shared/ui";
import {useBackdropStore, useModalStore, useToastStore} from "@/shared/model";
import {computed, defineAsyncComponent} from "vue";
import {showOne, useMenu} from "@/shared/lib";
import {OptionsIcon} from "@/shared/ui/icons";
import {useI18n} from "vue-i18n";
import {codes, type MenuItemCallback, type OptionsItemId} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import type {DisplayFlashcard} from "../model/types/display-flashcard.type";

const props = defineProps<{
  flashcard: DisplayFlashcard
}>();

const daysUntilDue = computed(() => {
  if (props.flashcard.status === "CREATED") return null;

  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = new Date(props.flashcard.dueAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / msPerDay));
});

const {t} = useI18n();

const {unstage} = useDraftFlashcardStorage();
const {push} = useToastStore();
const modalStore = useModalStore();
const backdropStore = useBackdropStore();

const callbacks = {
  edit: openUpdateFlashcardModal,
  delete: openDeleteFlashcardModal,
  rollback: rollbackFlashcard
} satisfies Record<OptionsItemId, MenuItemCallback>;

const {menuItemViews} = useMenu(createFlashcardsOptionsLayout(t(codeToKey(codes.FLASHCARD_RESOURCE_NAME))), t, callbacks);

function openUpdateFlashcardModal() {
  const updateFlashcardModal = defineAsyncComponent(() => import("./modals/UpdateFlashcardModal.vue"));
  showOne(backdropStore);
  modalStore.show(updateFlashcardModal, {
    id: props.flashcard.id,
    flashcardData: {
      front: props.flashcard.front,
      back: props.flashcard.back,
    }
  });
};

function openDeleteFlashcardModal() {
  const deleteFlashcardModal = defineAsyncComponent(() => import("./modals/DeleteFlashcardModal.vue"));
  showOne(backdropStore);
  modalStore.show(deleteFlashcardModal, {
    id: props.flashcard.id
  });
};

function rollbackFlashcard() {
  unstage(props.flashcard.id);
  push(t(codeToKey(codes.FLASHCARD_BATCH_ROLLBACK)));
}

const style = computed(() => {
  switch (props.flashcard.status) {
    case "COMMITTED": {
      return {
        "border": "0.0625rem solid",
        "border-color": "var(--color-border-default)"
      };
    }
    case "CREATED": {
      return {
        "border": "0.2rem dashed",
        "border-color": "var(--color-create)"
      };
    }
    case "UPDATED": {
      return {
        "border": "0.2rem dashed",
        "border-color": "var(--color-update)"
      };
    }
    case "DELETED": {
      return {
        "border": "0.2rem dashed",
        "border-color": "var(--color-delete)"
      };
    }
  }
});
</script>

<template>
  <div class="group/flashcard
              grid grid-rows-20 grid-cols-1 divide-y divide-default
              w-flashcard h-flashcard rounded-2xl
              cursor-pointer
              bg-primary shadow-lg
              transition duration-200
              hover:scale-105 hover:shadow-2xl"
       :style
       @click="openUpdateFlashcardModal">
    <div class="row-span-1 flex justify-end px-4 py-2 border-b-0
                opacity-0
                transition-all duration-300
                group-hover/flashcard:opacity-100">
      <DropdownMenu :menu-item-views
                    align="left"
                    :gap-rem="2.25"
                    dropdown-trigger-classes="p-1 rounded-full"
                    menu-container-classes="divide-y divide-default
                                            overflow-hidden border border-default rounded-2xl
                                            text-xs
                                            bg-tertiary"
                    menu-item-classes="flex items-center
                                       w-full h-10 px-3 py-1
                                       hover:bg-hover"
                    menu-item-icon-classes="w-5 h-5"
                    menu-item-label-classes="whitespace-nowrap">
        <OptionsIcon class="w-5 h-5"/>
      </DropdownMenu>
    </div>
    <div class="row-span-5 p-4">
      <div class="text-lg text-center line-clamp-2">
        {{ flashcard.front }}
      </div>
    </div>
    <div class="row-span-10 p-4">
      <div class="text-base text-center line-clamp-5">
        {{ flashcard.back }}
      </div>
    </div>
    <div class="row-span-4
                rounded-b-2xl px-5 py-3
                bg-tertiary">

      <IconLabel class="gap-2.5">
        <template #label>
          <span v-if="flashcard.status === 'CREATED'">
            {{ $t(codeToKey(codes.FLASHCARD_DEFAULT_DUE_AT)) }}
          </span>
          <span v-else>
            {{ $t(codeToKey(codes.FLASHCARD_DUE_AT), {n: daysUntilDue}) }}
          </span>
        </template>
        <template #icon>
          <ClockIcon class="min-w-7 min-h-7"/>
        </template>
      </IconLabel>
    </div>
  </div>
</template>