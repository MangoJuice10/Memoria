<script setup lang="ts">
import {Button, IconLabel, LocalizedLink} from "@/shared/ui";
import LoginIcon from "@/shared/ui/icons/actions/LoginIcon.vue";
import {AdminIcon} from "@/shared/ui/icons";
import {useAdminCheck} from "@/entities/admin";
import {onMounted} from "vue";

defineProps<{
  isAuthenticated: boolean
}>();

const {isAdmin, loadPermissions} = useAdminCheck();

onMounted(async () => {
  await loadPermissions();
});
</script>

<template>
  <div class="inline-flex justify-between items-center gap-3 lg:gap-5">
    <LocalizedLink v-if="isAuthenticated && isAdmin" name="admin">
      <Button class="py-1! h-10">
        <IconLabel class="gap-2.5">
          <template #icon>
            <AdminIcon class="w-6 h-6"/>
          </template>
          <template #label>
          <span v-text="$t('admin.title')"
                class="font-semibold"/>
          </template>
        </IconLabel>
      </Button>
    </LocalizedLink>
    <LocalizedLink v-if="!isAuthenticated" name="login">
      <Button class="py-1! h-10">
        <IconLabel class="gap-2.5">
          <template #icon>
            <LoginIcon class="w-6 h-6"/>
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