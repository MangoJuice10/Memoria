<script setup lang="ts">
import {Avatar} from "@/entities/user";
import {computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import {Button, CheckIcon, IconLabel, Loader, PlusIcon, StarIcon} from "@/shared/ui";
import {TagContainer} from "@/entities/tag";
import {createCopySharedDeckMutation} from "../api/mutations/copy-shared-deck.mutation";
import {asset} from "@/shared/lib";
import type {SharedDeckResponseDto} from "../model/shared-deck-response.dto";
/* ===== AI GENERATED CODE START ===== */
import {useI18n} from "vue-i18n";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

const {t} = useI18n();
/* ===== AI GENERATED CODE END ===== */

const props = defineProps<{
  deck: SharedDeckResponseDto;
  viewerId?: number;
  ownerId?: number;
}>();

const emit = defineEmits<{
  click: [];
}>();

const router = useRouter();
const route = useRoute();

const isOwner = computed(() => {
  if (props.ownerId !== undefined && props.viewerId !== undefined) {
    return props.viewerId === props.ownerId;
  }
  return false;
});

const ratingStars = computed(() => {
  if (props.deck.averageRating === null) return 0;
  return Math.round(props.deck.averageRating);
});

const ratingDisplay = computed(() =>
    props.deck.averageRating === null
        ? null
        : props.deck.averageRating.toFixed(1)
);

const {mutate: copyDeck, isPending} = createCopySharedDeckMutation();

function handleAddToCollection() {
  copyDeck(props.deck.id, {
    onSuccess: (newDeck) => {
      router.push({
        name: "deck-flashcards",
        params: {...route.params, deckId: String(newDeck.id)},
      });
    },
  });
}
</script>

<template>
  <div
      class="grid grid-rows-20 grid-cols-1
             w-deck h-deck overflow-hidden
             border-2 border-default rounded-3xl
             bg-linear-to-br from-(--color-secondary)/5 via-(--color-primary) to-(--color-primary)
             shadow-xl cursor-pointer
             transition-all duration-300 ease-out
             hover:scale-[1.03] hover:shadow-2xl hover:border-secondary/50
             hover:-translate-y-1"
      @click="emit('click')"
  >
    <!-- REFACTORED -->
    <div class="row-span-2
                flex justify-center items-center
                border-b border-default">
      <span class="px-10 py-5 truncate
                   text-lg text-center font-semibold">
        {{ deck.name }}
      </span>
    </div>
    <!-- REFACTORED -->

    <!-- REFACTORED -->
    <div class="row-span-4
                p-4 text-base text-center
                bg-primary">
      <div class="line-clamp-3">
        {{ deck.description }}
      </div>
    </div>
    <!-- REFACTORED -->

    <!-- REFACTORING -->
    <div class="row-span-7
                bg-primary">
      <img
          :src="deck.coverUrl ?? asset('filler/noDeckCover.png')"
          alt=""
          class="w-full h-full object-contain"/>
    </div>
    <!-- REFACTORING -->

    <!-- REFACTORING -->
    <div
        class="row-span-3
               flex items-center justify-center
               px-8 py-5 border-t-2 border-default
               bg-linear-to-r from-(--color-secondary)/5 to-(--color-primary)"
        @click.stop="handleAddToCollection">
      <Button v-if="!isOwner"
              :enabled="!isPending"
              class="w-full">
        <span v-if="isPending" class="flex items-center justify-center gap-2">
          <Loader class="w-4! h-4! border-2"/>
          <span class="font-semibold">{{ t(codeToKey(codes.SHARED_DECK_ADDING)) }}</span>
        </span>
        <IconLabel v-else
                   class="gap-2.5">
          <template #icon>
            <PlusIcon class="icon-static-inverse
                             w-4 h-4"/>
          </template>
          <template #label>
            <span class="font-semibold">
              {{ t(codeToKey(codes.SHARED_DECK_ADD_TO_COLLECTION)) }}
            </span>
          </template>
        </IconLabel>
      </Button>
      <div v-else class="text-sm font-semibold text-muted flex items-center gap-2">
        <CheckIcon class="w-5 h-5"/>
        {{ t(codeToKey(codes.SHARED_DECK_YOUR_DECK)) }}
      </div>
    </div>
    <!-- REFACTORING -->

    <!-- REFACTORING -->
    <div class="row-span-2
                flex items-center justify-between
                w-full px-5 border-default
                bg-linear-to-r from-(--color-secondary)/5 to-(--color-primary)">
      <span class="flex items-center gap-1.5 font-bold"
            :aria-label="ratingDisplay ? `Rating: ${ratingDisplay} out of 5` : 'No ratings'">
        <span class="flex items-center gap-0.5">
          <StarIcon
              v-for="star in 5"
              :key="star"
              class="w-5 h-5 transition-transform group-hover:scale-110"
              :class="star <= ratingStars ? 'icon-static-inverse' : 'icon-static'"
              :aria-hidden="true"
          />
        </span>
        <span class="text-base ml-1">{{ ratingDisplay ?? "0.0" }}</span>
      </span>
      <div class="flex items-center gap-2
                  w-1/3">
        <Avatar :src="deck.ownerAvatarUrl ?? asset('filler/noAvatar.png')"
                class="w-6 h-6"/>
        <span class="text-base text-muted truncate">
          {{ deck.ownerUsername }}
        </span>
      </div>
    </div>
    <!-- REFACTORING -->

    <!-- REFACTORING -->
    <div class="row-span-2
                flex items-center
                px-5 overflow-hidden
                bg-linear-to-r from-(--color-secondary)/5 to-(--color-primary)">
      <TagContainer :tags="deck.tags" :max-visible="2" class="text-base scale-75 origin-left"/>
    </div>
    <!-- REFACTORING -->
  </div>
</template>
