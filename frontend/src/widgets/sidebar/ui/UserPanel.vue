<script setup lang="ts">
import {useViewerStore} from "@/entities/viewer";
import {storeToRefs} from "pinia";
import {asset} from "@/shared/lib";
import {ArrowIcon} from "@/shared/ui/icons";

const viewerStore = useViewerStore();
const {viewer} = storeToRefs(viewerStore);
</script>

<template>
  <div class="flex justify-between items-center h-20 px-page border-t border-default cursor-pointer
              hover:bg-hover">
    <div class="flex justify-center items-center gap-5">
      <img :src="asset('filler/noImage.png')" alt="" class="w-13">
      <div>
        <div class="font-bold mb-2">{{ viewer?.username }}</div>
        <div class="text-sm">{{ $t("profile.heading") }}</div>
      </div>
    </div>
    <ArrowIcon class="w-7 rotate-90"/>
  </div>
</template>