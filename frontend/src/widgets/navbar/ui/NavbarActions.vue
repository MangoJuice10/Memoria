<script setup lang="ts">
import {Button, IconLabel, LocalizedLink} from "@/shared/ui";
import LoginIcon from "@/shared/ui/icons/actions/LoginIcon.vue";

defineProps<{
  isAuthenticated: boolean
}>();
</script>

<template>
  <div class="inline-flex justify-between items-center gap-3 lg:gap-5">
    <LocalizedLink v-if="!isAuthenticated" name="login">
      <Button class="py-1!">
        <IconLabel class="gap-2.5">
          <template #icon>
            <LoginIcon class="w-7"/>
          </template>
          <template #label>
          <span v-text="$t('auth.login.action')"
                class="font-semibold"/>
          </template>
        </IconLabel>
      </Button>
    </LocalizedLink>
  </div>
</template>