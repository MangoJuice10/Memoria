<script setup lang="ts">
import {IconLabel, TabLinks, Toggle} from "@/shared/ui";
import {DeckIcon} from "@/shared/ui/icons";
import {codeToKey} from "@/shared/i18n";
import {resourceCodes} from "@/shared/config";
import {useMenu} from "@/shared/lib";
import {DECK_TABS_LAYOUT} from "../config/deck-tabs-layout.ts";
import {useI18n} from "vue-i18n";

defineProps<{
  id: number;
  name: string;
  isPublic: boolean;
}>();

const {t} = useI18n();

const {menuItemViews} = useMenu(DECK_TABS_LAYOUT, t);

</script>

<template>
  <div class="flex justify-between py-4 border-b border-default">
    <div class="flex gap-6">
      <IconLabel>
        <template #label>
          <span class="text-xl font-semibold">
            {{ name }}
          </span>
        </template>
        <template #icon>
          <DeckIcon class="w-8"/>
        </template>
      </IconLabel>
      <Toggle class="grow"
              @on="console.log('TODO ON')"
              @off="console.log('TODO OFF')">
        <template #on>
          <span class="text-lg font-semibold">
            {{ $t(codeToKey(resourceCodes.DECK_PUBLIC)) }}
          </span>
        </template>
        <template #off>
          <span class="text-lg font-semibold">
            {{ $t(codeToKey(resourceCodes.DECK_PRIVATE)) }}
          </span>
        </template>
      </Toggle>
    </div>
    <TabLinks :menu-item-views
              class="text-lg"/>
  </div>
</template>