<script setup lang="ts">
import {LocalizedLink} from "@/shared/ui";
import {Button} from "@/shared/ui";

defineProps<{
  isAuthenticated: boolean
}>();
</script>

<template>
  <div class="inline-flex justify-between items-center gap-3 lg:gap-5">
    <LocalizedLink v-if="!isAuthenticated" name="login">
      <Button class="font-semibold">
        <span v-text="$t('auth.login.action')"/>
      </Button>
    </LocalizedLink>
  </div>
</template>