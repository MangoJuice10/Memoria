<script setup lang="ts">

import {Dropdown, IconLabel, IconLabelButton, MenuContainer} from "@/shared/ui";
import {FiltersIcon, SortIcon} from "@/shared/ui/icons";
import {Searchbar} from "@/shared/ui";
</script>

<template>
  <div class="flex justify-between items-center h-20 text-base">
    <div class="flex items-center gap-10">
      <Dropdown trigger-classes="px-3 py-2 rounded-2xl">
        <template #trigger>
          <IconLabel>
            <template #label>
              <!--TODO-->
              <span>
                Filters
              </span>
            </template>
            <template #icon>
              <FiltersIcon class="w-7"/>
            </template>
          </IconLabel>
        </template>
        <template #menu>
          <MenuContainer class="w-100 h-100 border border-default rounded-2xl
                      bg-tertiary">
            Hello
          </MenuContainer>
        </template>
      </Dropdown>

      <Dropdown trigger-classes="px-3 py-2 rounded-2xl">
        <template #trigger>
          <IconLabel>
            <template #label>
              <!--TODO-->
              Sort
            </template>
            <template #icon>
              <SortIcon class="w-7"/>
            </template>
          </IconLabel>
        </template>
        <template #menu>
          <MenuContainer class="w-100 h-100 border border-default rounded-2xl
                      bg-tertiary">
            Good day
          </MenuContainer>
        </template>
      </Dropdown>
      <Searchbar/>
    </div>
  </div>
</template>

<style scoped>

</style>