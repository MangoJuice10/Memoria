<script setup lang="ts">
import ClockIcon from "@/shared/ui/icons/ClockIcon.vue";
import {Dropdown, IconLabel, MenuContainer, MenuItem} from "@/shared/ui";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {defineAsyncComponent} from "vue";
import {showOne, useMenu} from "@/shared/lib";
import {OptionsIcon} from "@/shared/ui/icons";
import {useI18n} from "vue-i18n";
import {OPTIONS_LAYOUT} from "@/shared/config";

const props = defineProps<{
  id: number;
  front: string;
  back: string;
  interval: number;
  deckId: number;
}>();

const {t} = useI18n();

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

const {menuItemViews} = useMenu(OPTIONS_LAYOUT, t);

function setupMenuCallbacks() {
  const editItem = menuItemViews.value.find(({id}) => id === "edit");
  if (!editItem) throw new Error("Edit menu item is missing");
  editItem.callback = openUpdateFlashcardModal;

  const deleteItem = menuItemViews.value.find(({id}) => id === "delete");
  if (!deleteItem) throw new Error("Delete menu item is missing");
  deleteItem.callback = openDeleteFlashcardModal;
}

const openUpdateFlashcardModal = () => {
  const updateFlashcardModal = defineAsyncComponent(() => import("./modals/UpdateFlashcardModal.vue"));
  showOne(backdropStore);
  modalStore.show(updateFlashcardModal, {
    id: props.id,
    front: props.front,
    back: props.back,
    deckId: props.deckId
  });
};

const openDeleteFlashcardModal = () => {
  const deleteFlashcardModal = defineAsyncComponent(() => import("./modals/DeleteFlashcardModal.vue"));
  showOne(backdropStore);
  modalStore.show(deleteFlashcardModal, {
    id: props.id,
    deckId: props.deckId
  });
};

setupMenuCallbacks();
</script>

<template>
  <div class="group/flashcard grid grid-rows-20 grid-cols-1 divide-y divide-default
            w-flashcard h-flashcard border border-default rounded-2xl
            bg-primary cursor-pointer
            transition duration-200
            hover:scale-105"
       @click="openUpdateFlashcardModal">
    <div class="row-span-1 flex justify-end px-4 py-2 border-b-0
                opacity-0
                transition-all duration-300
                group-hover/flashcard:opacity-100">
      <Dropdown align="left"
                :gap-rem="2.25"
                trigger-classes="p-1 rounded-full">
        <template #trigger>
          <OptionsIcon class="w-5 h-5"/>
        </template>
        <template #menu>
          <MenuContainer class="overflow-hidden border border-default rounded-2xl text-xs">
            <MenuItem v-for="optionsItemView in menuItemViews"
                      :menu-item-view="optionsItemView"
                      icon-classes="w-5"
                      label-classes="whitespace-nowrap"
                      class="px-3 py-1"
                      @click.stop="optionsItemView.callback"/>
          </MenuContainer>
        </template>
      </Dropdown>
    </div>
    <div class="row-span-5 p-4">
      <div class="text-lg text-center line-clamp-2">
        {{ front }}
      </div>
    </div>
    <div class="row-span-10 p-4">
      <div class="text-base text-center line-clamp-6">
        {{ back }}
      </div>
    </div>
    <div class="row-span-4
                rounded-b-2xl px-5 py-3
                bg-tertiary">
      <IconLabel>
        <template #label>
          {{ interval }}
        </template>
        <template #icon>
          <ClockIcon class="w-7"/>
        </template>
      </IconLabel>
    </div>
  </div>
</template>