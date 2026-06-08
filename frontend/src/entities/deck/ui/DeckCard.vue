<script setup lang="ts">
import {FlashcardIcon, FlashcardsIcon, IconLabel, LocalizedLink} from "@/shared/ui";
import {asset} from "@/shared/lib";
import {useI18n} from "vue-i18n";
import {PublicIcon} from "@/shared/ui";
import {PrivateIcon} from "@/shared/ui";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";
import {TagList} from "@/entities/tag";
import type {TagResponseDto} from "@/entities/tag";

const props = defineProps<{
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  coverUrl: string | null;
  flashcardsCount: number;
  tags?: TagResponseDto[];
}>();

const {t} = useI18n();
</script>

<template>
  <LocalizedLink name="deck-flashcards" :params="{deckId: String(id)}">
    <div class="grid grid-rows-20 grid-cols-1
                w-deck h-deck overflow-hidden
                border border-default rounded-2xl
                bg-linear-to-br from-(--color-secondary)/5 via-(--color-primary) to-(--color-primary) shadow-lg cursor-pointer
                transition duration-200
                hover:scale-105
                hover:shadow-2xl">
      <div class="row-span-2
                  flex justify-center items-center
                  px-10 py-5 border-b border-default
                  text-lg text-center font-semibold
                  bg-linear-to-r from-(--color-secondary)/5 to-(--color-primary)">
        <span class="truncate">
          {{ name }}
        </span>
      </div>
      <div class="row-span-4
                  p-4 text-base text-center
                  bg-primary">
        <span class="line-clamp-3">
          {{ description }}
        </span>
      </div>
      <img :src="coverUrl ?? asset('filler/noDeckCover.png')" alt=""
           class="row-span-10
                  w-full h-full object-contain
                  bg-primary">
      <div class="row-span-2
                  flex justify-between
                  px-5 py-3 border-t border-default
                  bg-linear-to-r from-(--color-secondary)/5 to-(--color-primary)">
        <IconLabel class="gap-2.5">
          <template #label>
            <span class="text-base">
              {{ isPublic ? t(codeToKey(codes.DECK_IS_PUBLIC)) : t(codeToKey(codes.DECK_PRIVATE)) }}
            </span>
          </template>
          <template #icon>
            <PublicIcon v-if="isPublic"
                        class="w-8 h-8"/>
            <PrivateIcon v-else
                         class="w-8 h-8"/>
          </template>
        </IconLabel>
        <IconLabel class="gap-2.5">
          <template #label>
            <span class="text-base">
              {{ t(codeToKey(codes.DECK_FLASHCARDS_COUNT), {n: flashcardsCount}) }}
            </span>
          </template>
          <template #icon>
            <FlashcardsIcon class="w-8 h-8"/>
          </template>
        </IconLabel>
      </div>
      <!-- Tags row -->
      <div class="row-span-2
                  flex items-center
                  px-5 overflow-hidden
                  bg-linear-to-r from-(--color-secondary)/5 to-(--color-primary)">
        <TagList v-if="tags && tags.length > 0"
                 :tags="tags"
                 :max-visible="2"
                 class="text-base
                        scale-75 origin-left"/>
      </div>
    </div>
  </LocalizedLink>
</template>