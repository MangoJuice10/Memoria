<script setup lang="ts">
import {useViewerStore} from "@/entities/viewer";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {asset} from "@/shared/lib";
import {ArrowIcon} from "@/shared/ui/icons";
import {MenuContainer} from "@/shared/ui";
import {MenuItem} from "@/shared/ui";
import {useUserPanel} from "@/features/settings/model/useUserPanel.ts";
import {useBackdrop} from "@/shared/lib/useBackdrop.ts";

const router = useRouter();

const viewerStore = useViewerStore();
const {viewer} = storeToRefs(viewerStore);

const {hideBackdrop} = useBackdrop();

const {userPanelItemViews} = useUserPanel();

function setupMenuCallbacks() {
  const logoutItem = userPanelItemViews.find(({id}) => id === "logout");
  if (!logoutItem) throw new Error("Logout menu item is missing");
  logoutItem.callback = async () => {
    await viewerStore.logout();
    await router.push({
      name: "home"
    });
    hideBackdrop();
  };
}

setupMenuCallbacks();
</script>

<template>
  <div class="group/container flex flex-col-reverse relative h-30">
    <div class="group/panel peer/panel
                flex justify-between items-center w-full h-20 px-page border-t border-default cursor-pointer
                group-hover/container:bg-hover">
      <div class="flex justify-center items-center gap-5 p-5">
        <img :src="asset('filler/noImage.png')" alt="" class="w-13">
        <div>
          <div class="font-bold mb-2">{{ viewer?.username }}</div>
          <div class="text-sm">{{ $t("settings.heading") }}</div>
        </div>
      </div>
      <ArrowIcon class="w-7 rotate-90
                        transition-transform duration-400
                        group-hover/container:-rotate-90 group-hover/panel:-rotate-90"/>
    </div>
    <MenuContainer class="left-1/2 bottom-full -translate-x-1/2
                          w-4/5 rounded-xl
                          transition-all duration-400 ease-out
                          opacity-0 translate-y-10 pointer-events-none
                          group-hover/container:opacity-100 peer-hover/panel:opacity-100
                          group-hover/container:translate-y-0 peer-hover/panel:translate-y-0
                          group-hover/container:pointer-events-auto peer-hover/panel:pointer-events-auto">
      <MenuItem v-for="userPanelItemView in userPanelItemViews"
                :menu-item-view="userPanelItemView"
                @click="userPanelItemView.callback"/>
    </MenuContainer>
  </div>
</template>