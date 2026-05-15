<script setup lang="ts">
import {FlashcardIcon, IconLabel, LocalizedLink} from "@/shared/ui";
import {asset, getMenuItemViewOrThrow, showOne, useMenu} from "@/shared/lib";
import {useI18n} from "vue-i18n";
import {PublicIcon} from "@/shared/ui";
import {PrivateIcon} from "@/shared/ui";
import {deckPropertyCodes, OPTIONS_LAYOUT} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import {defineAsyncComponent} from "vue";
import {useBackdropStore, useModalStore} from "@/shared/model";

const props = defineProps<{
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  flashcardsCount: number;
}>();

const {t} = useI18n();

const backdropStore = useBackdropStore();
const modalStore = useModalStore();

const {menuItemViews} = useMenu(OPTIONS_LAYOUT, t);

function setupMenuCallbacks() {
  const deleteItem = getMenuItemViewOrThrow(menuItemViews.value, "delete");
  deleteItem.callback = openDeckDeleteModal;
}

function openDeckDeleteModal() {
  const deleteDeckModal = defineAsyncComponent(() => import("./modals/DeleteDeckModal.vue"));
  showOne(backdropStore);
  modalStore.show(deleteDeckModal, {
    id: props.id
  });
}

setupMenuCallbacks();
</script>

<template>
  <LocalizedLink name="deck-flashcards" :params="{deckId: String(id)}">
    <div class="grid grid-rows-20 gap-5
            w-deck h-deck overflow-hidden
            border border-default rounded-2xl
            bg-primary cursor-pointer
            transition duration-200
            hover:scale-105">
      <div class="row-span-3
                  p-4 border-b border-default
                  text-lg text-center">
        {{ name }}
      </div>
      <div class="row-span-5
                  p-4 text-base text-center">
        {{ description }}
      </div>
      <img :src="asset('filler/deckCover.png')" alt=""
           class="row-span-9
                  w-full h-full object-contain">
      <div class="row-span-3
                  flex justify-between
                  px-5 py-3
                  bg-tertiary">
        <IconLabel>
          <template #label>
            <span class="text-base">
              {{
                isPublic ? t(codeToKey(deckPropertyCodes.DECK_IS_PUBLIC)) : t(codeToKey(deckPropertyCodes.DECK_PRIVATE))
              }}
            </span>
          </template>
          <template #icon>
            <PublicIcon v-if="isPublic"
                        class="w-8 h-8"/>
            <PrivateIcon v-else
                         class="w-8 h-8"/>
          </template>
        </IconLabel>
        <IconLabel>
          <template #label>
            <span class="text-base">
              {{ t(codeToKey(deckPropertyCodes.DECK_FLASHCARDS_COUNT), {n: flashcardsCount}) }}
            </span>
          </template>
          <template #icon>
            <FlashcardIcon class="w-8 h-8"/>
          </template>
        </IconLabel>
      </div>
    </div>
  </LocalizedLink>
</template>