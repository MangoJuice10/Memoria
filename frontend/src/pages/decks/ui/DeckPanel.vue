<script setup lang="ts">
import {IconLabel, Toggle} from "@/shared/ui";
import {DeckIcon} from "@/shared/ui/icons";
import {codeToKey} from "@/shared/i18n";
import {resourceCodes} from "@/shared/config";

defineProps<{
  id: number;
  name: string;
  isPublic: boolean;
}>();

const tabLinks: TabLink[] = [

]

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
    <div class="flex justify-between items-center gap-10">
      <TabLink :is-active="true" :callback="() => console.log('TODO')"
               class="text-xl">
        {{ $t(codeToKey(resourceCodes.DECK_FLASHCARDS)) }}
      </TabLink>
      <TabLink :is-active="false" :callback="() => console.log('TODO')"
               class="text-xl">
        {{ $t(codeToKey(resourceCodes.DECK_INFO)) }}
      </TabLink>
      <TabLink :is-active="false" :callback="() => console.log('TODO')"
               class="text-xl">
        {{ $t(codeToKey(resourceCodes.DECK_EDUCATIONAL_RESOURCES)) }}
      </TabLink>

    </div>
  </div>
</template>

<style scoped>

</style>