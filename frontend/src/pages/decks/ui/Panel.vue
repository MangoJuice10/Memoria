<script setup lang="ts">

import {IconLabel, Toggle} from "@/shared/ui";
import {DeckIcon} from "@/shared/ui/icons";
import TabLink from "@/pages/decks/ui/tabs/TabLink.vue";

</script>

<template>
  <div class="flex justify-between py-4 border-b border-default">
    <div class="flex gap-6">
      <IconLabel>
        <template #label>
          <!--TODO-->
          <span class="text-xl font-semibold">
          Algorithmization
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
          <!--TODO-->
          <span class="text-lg font-semibold">
            Public
          </span>
        </template>
        <template #off>
          <!--TODO-->
          <span class="text-lg font-semibold">
            Private
          </span>
        </template>
      </Toggle>
    </div>
    <div class="flex justify-between items-center gap-10">
      <TabLink :is-active="true" :callback="() => console.log('TODO')"
               class="text-xl">
        Flashcards
      </TabLink>
      <TabLink :is-active="false" :callback="() => console.log('TODO')"
               class="text-xl">
        Tags
      </TabLink>
      <TabLink :is-active="false" :callback="() => console.log('TODO')"
               class="text-xl">
        Educational Resources
      </TabLink>

    </div>
  </div>
</template>

<style scoped>

</style>