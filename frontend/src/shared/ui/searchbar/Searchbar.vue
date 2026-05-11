<script setup lang="ts">

import {SearchIcon} from "@/shared/ui/icons";
</script>

<template>
  <div class="flex gap-2 px-4 py-2 border rounded-4xl border-default bg-primary">
    <SearchIcon class="w-7 opacity-70"/>
    <!--TODO-->
    <input type="text"
           placeholder="Search..."
           class="outline-none">
  </div>
</template>