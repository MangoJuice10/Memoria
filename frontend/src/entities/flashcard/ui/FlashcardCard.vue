<script setup lang="ts">
import {ClockIcon} from "@/shared/ui";
import {Dropdown, IconLabel, MenuContainer, MenuItem} from "@/shared/ui";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {computed, defineAsyncComponent} from "vue";
import {getMenuItemViewOrThrow, showOne, useMenu} from "@/shared/lib";
import {OptionsIcon} from "@/shared/ui/icons";
import {useI18n} from "vue-i18n";
import {codes, createOptionsLayout} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

const props = defineProps<{
  id: number;
  front: string;
  back: string;
  dueAt: string;
  deckId: number;
}>();

const daysUntilDue = computed(() => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diff = new Date(props.dueAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / msPerDay));
});

const {t} = useI18n();

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

const {menuItemViews} = useMenu(createOptionsLayout(t(codeToKey(codes.FLASHCARD_RESOURCE_NAME))), t);

function setupMenuCallbacks() {
  const editItem = getMenuItemViewOrThrow(menuItemViews.value, "edit");
  editItem.callback = openUpdateFlashcardModal;

  const deleteItem = getMenuItemViewOrThrow(menuItemViews.value, "delete");
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
  <div class="group/flashcard
              grid grid-rows-20 grid-cols-1 divide-y divide-default
              w-flashcard h-flashcard border border-default rounded-2xl
              bg-primary cursor-pointer
              shadow-lg
              transition duration-200
              hover:scale-105 hover:shadow-2xl"
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
      <div class="text-base text-center line-clamp-5">
        {{ back }}
      </div>
    </div>
    <div class="row-span-4
                rounded-b-2xl px-5 py-3
                bg-tertiary">
      <IconLabel>
        <template #label>
          <span>
            {{ $t(codeToKey(codes.FLASHCARD_DUE_AT), {n: daysUntilDue}) }}
          </span>
        </template>
        <template #icon>
          <ClockIcon class="w-7"/>
        </template>
      </IconLabel>
    </div>
  </div>
</template>