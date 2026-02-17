<script setup lang="ts">
import {ref, watch} from "vue";
import type {Publication} from "@/types/Publication";
import {fetchPublications} from "@/repositories/PublicationsRepository";
import {useI18n} from "vue-i18n";
import IconButton from "@/components/utils/IconButton.vue";
import PublicationCard from "@/components/cards/PublicationCard.vue";
import ArrowIcon from "@/components/icons/utils/ArrowIcon.vue";
import noImage from "@/assets/filler/noImage.png";

const {t} = useI18n();

const PAGE_SIZE = 6;
const TOTAL_PAGES = 5;
const page = ref(1);
const publications = ref<Publication[]>([]);

async function loadPublications() {
  publications.value = await fetchPublications(page.value, PAGE_SIZE);
}

function flipPage(computeNewPage: (oldPage: number) => number) {
  let newPage = computeNewPage(page.value);
  if (newPage < 1) {
    newPage = 1;
  } else if (newPage > TOTAL_PAGES) {
    newPage = TOTAL_PAGES;
  }
  page.value = newPage;
}

watch(page, loadPublications, {immediate: true});
</script>

<template>
  <div class="flex flex-col items-center gap-10 py-10">
    <div class="flex flex-col items-center gap-5">
      <div v-text="t('landing.sharedDecks.headline')" class="text-4xl font-semibold "/>
      <div v-text="t('landing.sharedDecks.subheadline')" class="text-lg"/>
    </div>
    <div class="grid grid-rows-2 grid-cols-3 gap-20">
      <PublicationCard v-for="publication in publications" :key="publication.id" :name="publication.name"
                       :rating="publication.rating"
                       :imagePath="noImage"/>
    </div>
    <div class="flex items-center gap-4">
      <IconButton @click="flipPage((oldPage: number) => oldPage - 1)">
        <ArrowIcon class="w-10 aspect-square rotate-180 icon-static"/>
      </IconButton>
      <div class="text-3xl font-semibold">{{ page }}/{{ TOTAL_PAGES }}</div>
      <IconButton @click="flipPage((oldPage: number) => oldPage + 1)">
        <ArrowIcon class="w-10 aspect-square icon-static"/>
      </IconButton>
    </div>
  </div>
</template>

<style class="scoped">
  .grid > img {
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    object-fit: contain;
  }
</style>