<script setup lang="ts">
import {FlashcardIcon, IconLabel, LocalizedLink} from "@/shared/ui";
import {asset} from "@/shared/lib";
import {useI18n} from "vue-i18n";
import {PublicIcon} from "@/shared/ui";
import {PrivateIcon} from "@/shared/ui";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

defineProps<{
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  coverUrl: string | null;
  flashcardsCount: number;
}>();

const {t} = useI18n();
</script>

<template>
  <LocalizedLink name="deck-flashcards" :params="{deckId: String(id)}">
    <div class="grid grid-rows-20 gap-5
                w-deck h-deck overflow-hidden
                border border-default rounded-2xl
                bg-primary shadow-lg cursor-pointer
                transition duration-200
                hover:scale-105
                hover:shadow-2xl">
      <div class="row-span-3
                  p-4 border-b border-default
                  text-lg text-center">
        <div class="line-clamp-1">
          {{ name }}
        </div>
      </div>
      <div class="row-span-5
                  p-4 text-base text-center">
        <div class="line-clamp-4">
          {{ description }}
        </div>
      </div>
      <img :src="coverUrl ?? asset('filler/noDeckCover.png')" alt=""
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
                isPublic ? t(codeToKey(codes.DECK_IS_PUBLIC)) : t(codeToKey(codes.DECK_PRIVATE))
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
              {{ t(codeToKey(codes.DECK_FLASHCARDS_COUNT), {n: flashcardsCount}) }}
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