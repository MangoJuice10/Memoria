<script setup lang="ts">
import {SearchIcon} from "@/shared/ui/icons";

const modelValue = defineModel();
</script>

<template>
  <div class="flex items-center gap-2
              h-12.5 px-4 py-2 border rounded-4xl border-default
              bg-primary
              hover:outline-1 hover:outline-active focus-within:outline-1 focus-within:outline-active">
    <SearchIcon class="w-7 opacity-70"/>
    <!--TODO-->
    <input v-model="modelValue"
           type="text"
           :placeholder="$t('actions.search')"
           class="grow
                  text-base
                  outline-none">
  </div>
</template>