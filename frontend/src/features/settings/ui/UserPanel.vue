<script setup lang="ts">
import {defineAsyncComponent} from "vue";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import {useViewerStore} from "@/entities/viewer";
import {useSidebarStore} from "@/shared/model";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {asset, showOne, useMenu} from "@/shared/lib";
import {DropdownMenu} from "@/shared/ui";
import {USER_PANEL_LAYOUT} from "@/features/settings/config/user-panel-layout.config.ts";
import {Avatar} from "@/entities/user";

const {t} = useI18n();

const {viewer} = storeToRefs(useViewerStore());
const modalStore = useModalStore();
const backdropStore = useBackdropStore();
const sidebarStore = useSidebarStore();

const {menuItemViews} = useMenu(USER_PANEL_LAYOUT, t);

function setupMenuCallbacks() {
  const logoutItem = menuItemViews.value.find(({id}) => id === "logout");
  if (!logoutItem) throw new Error("Logout menu item is missing");
  logoutItem.callback = async () => {
    const logoutModalComponent = defineAsyncComponent(() => import("./modals/LogoutModal.vue"));
    showOne(backdropStore, sidebarStore);
    modalStore.show(logoutModalComponent);
  };

  const settingsItem = menuItemViews.value.find(({id}) => id === "settings");
  if (!settingsItem) throw new Error("Settings item is missing");
  settingsItem.callback = async () => {
    const settingsModalComponent = defineAsyncComponent(() => import("./modals/SettingsModal.vue"));
    showOne(backdropStore, sidebarStore);
    modalStore.show(settingsModalComponent);
  };
}

setupMenuCallbacks();
</script>

<template>
  <DropdownMenu :menu-item-views
                side="top"
                align="center"
                has-arrow
                has-pin
                :gap-rem="2.25"
                dropdown-trigger-classes="border-t border-default p-1"
                dropdown-menu-classes="w-4/5"
                menu-container-classes="divide-y divide-default
                                        border border-default rounded-2xl overflow-hidden
                                        font-semibold
                                        bg-tertiary"
                menu-item-classes="flex items-center
                                   w-full px-7 py-3
                                   hover:bg-hover"
                menu-item-icon-classes="w-10 h-10"
                menu-item-label-classes="whitespace-nowrap"
                arrow-classes="w-7"
                pin-classes="w-7">
    <div class="flex justify-center items-center gap-5
                p-5">
      <Avatar :src="viewer?.avatarUrl ?? asset('filler/noAvatar.png')"
              class="w-12 h-12"/>
      <div>
        <div class="font-bold mb-2">{{ viewer?.username }}</div>
        <div class="text-sm">{{ $t("settings.heading") }}</div>
      </div>
    </div>
  </DropdownMenu>
</template>