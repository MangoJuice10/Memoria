<script setup lang="ts">
import {Navbar} from "@/widgets/navbar";
import {Sidebar} from "@/widgets/sidebar";
import {Backdrop} from "@/shared/ui";
</script>

<template>
  <Navbar/>
  <Sidebar/>
  <Backdrop/>
  <RouterView class="py-page"/>
</template>