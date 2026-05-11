<script setup lang="ts">
import {defineAsyncComponent} from "vue";
import {useI18n} from "vue-i18n";
import {storeToRefs} from "pinia";
import {useViewerStore} from "@/entities/viewer";
import {useSidebarStore} from "@/shared/model";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {asset, showOne, useMenu} from "@/shared/lib";
import {Dropdown, MenuContainer} from "@/shared/ui";
import {MenuItem} from "@/shared/ui";
import {USER_PANEL_LAYOUT} from "@/features/settings/config/user-panel-layout.config.ts";

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
  <Dropdown side="top"
            align="center"
            has-arrow
            has-pin
            trigger-classes="border-t border-default"
            arrow-classes="w-7"
            pin-classes="w-7"
            menu-classes="w-4/5">
    <template #trigger>
      <div class="flex justify-center items-center gap-5 p-5">
        <img :src="asset('filler/noImage.png')" alt="" class="w-13">
        <div>
          <div class="font-bold mb-2">{{ viewer?.username }}</div>
          <div class="text-sm">{{ $t("settings.heading") }}</div>
        </div>
      </div>
    </template>
    <template #menu>
      <MenuContainer class="overflow-hidden border border-default rounded-2xl">
        <MenuItem v-for="userPanelItemView in menuItemViews"
                  :menu-item-view="userPanelItemView"
                  icon-classes="w-10"
                  class="px-7 py-3"
                  @click="userPanelItemView.callback"/>
      </MenuContainer>
    </template>
  </Dropdown>
</template>