<script setup lang="ts">
import {ref, defineAsyncComponent} from "vue";
import {storeToRefs} from "pinia";
import {useUserPanel} from "../model/useUserPanel.ts";
import {useViewerStore} from "@/entities/viewer";
import {useSidebarStore} from "@/shared/model";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {asset, showOne} from "@/shared/lib";
import {MenuContainer} from "@/shared/ui";
import {MenuItem} from "@/shared/ui";
import {ArrowIcon, PinIcon} from "@/shared/ui/icons";

const isOpen = ref(false);

const {viewer} = storeToRefs(useViewerStore());
const modalStore = useModalStore();
const backdropStore = useBackdropStore();
const sidebarStore = useSidebarStore();

const {userPanelItemViews} = useUserPanel();

function setupMenuCallbacks() {
  const logoutItem = userPanelItemViews.find(({id}) => id === "logout");
  if (!logoutItem) throw new Error("Logout menu item is missing");
  logoutItem.callback = async () => {
    const logoutModalComponent = defineAsyncComponent(() => import("./modals/LogoutModal.vue"));
    showOne(backdropStore, sidebarStore);
    modalStore.show(logoutModalComponent);
  };

  const settingsItem = userPanelItemViews.find(({id}) => id === "settings");
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
  <div class="group/container flex flex-col-reverse relative h-30">
    <div class="group/panel peer/panel
                flex items-center gap-5 w-full h-20 px-page border-t border-default cursor-pointer
                group-hover/container:bg-hover"
         :class="{'bg-hover': isOpen}"
         @click="isOpen = !isOpen">
      <div class="grow flex justify-between items-center">
        <div class="flex justify-center items-center gap-5 p-5">
          <img :src="asset('filler/noImage.png')" alt="" class="w-13">
          <div>
            <div class="font-bold mb-2">{{ viewer?.username }}</div>
            <div class="text-sm">{{ $t("settings.heading") }}</div>
          </div>
        </div>
        <ArrowIcon class="icon-dynamic-inverse
                          w-7
                          transition-transform duration-400"
                   :class="isOpen
                        ? '-rotate-90'
                        : 'rotate-90 group-hover/container:-rotate-90 group-hover/panel:-rotate-90'"/>
      </div>
      <PinIcon class="transition-all duration-500"
               :class="isOpen
                      ? 'icon-dynamic-inverse rotate-0 scale-110'
                      : 'icon-dynamic-disabled -rotate-45 scale-100'"/>
    </div>
    <MenuContainer class="absolute left-1/2 bottom-full -translate-x-1/2
                          w-4/5 overflow-hidden
                          border border-default rounded-xl
                          transition-all duration-400 ease-out"
                   :class="{'opacity-0 translate-y-10 pointer-events-none \
                            group-hover/container:opacity-100 peer-hover/panel:opacity-100 \
                            group-hover/container:translate-y-0 peer-hover/panel:translate-y-0 \
                            group-hover/container:pointer-events-auto peer-hover/panel:pointer-events-auto': !isOpen}">
      <MenuItem v-for="userPanelItemView in userPanelItemViews"
                :menu-item-view="userPanelItemView"
                @click="userPanelItemView.callback"/>
    </MenuContainer>
  </div>
</template>