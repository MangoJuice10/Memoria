<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {MenuContainer, MenuItem, Modal} from "@/shared/ui";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {onMounted} from "vue";
import ProfileTab from "@/features/settings/ui/tabs/ProfileTab.vue";
import {useMenu} from "@/shared/lib";
import {SETTINGS_LAYOUT} from "../../config/settings-layout.config";

const {t} = useI18n();

const {menuItemViews} = useMenu(SETTINGS_LAYOUT, t);
console.log(menuItemViews);

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

onMounted(() => {
  backdropStore.setCallback(() => {
    modalStore.hide();
  });
});
</script>

<template>
  <Modal>
    <div class="grid grid-cols-[repeat(4,minmax(min-content,1fr))] h-full">
      <div class="col-span-1">
        <MenuContainer class="h-full border-r border-default">
          <MenuItem v-for="settingsItem in menuItemViews"
                    :menu-item-view="settingsItem"
                    icon-classes="w-10"
                    class="px-7 py-3"/>
        </MenuContainer>
      </div>
      <div class="col-span-3 p-10 overflow-y-scroll">
        <component :is="ProfileTab"/>
      </div>
    </div>
  </Modal>
</template>