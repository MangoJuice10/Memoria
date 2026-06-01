<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {MenuContainer, MenuItem, Modal} from "@/shared/ui";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {onMounted, ref, computed} from "vue";
import ProfileTab from "@/features/settings/ui/tabs/ProfileTab.vue";
import ThemeTab from "@/features/settings/ui/tabs/ThemeTab.vue";
import LanguageTab from "@/features/settings/ui/tabs/LanguageTab.vue";
import {useMenu} from "@/shared/lib";
import {SETTINGS_LAYOUT} from "../../config/settings-layout.config";
import type {SettingsItemId} from "@/shared/config";

const {t} = useI18n();

const {menuItemViews} = useMenu(SETTINGS_LAYOUT, t);

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

const activeTab = ref<SettingsItemId>("profile");

const tabComponents: Record<SettingsItemId, unknown> = {
  profile: ProfileTab,
  theme: ThemeTab,
  language: LanguageTab,
};

const activeComponent = computed(() => tabComponents[activeTab.value]);

onMounted(() => {
  backdropStore.setCallback(() => {
    modalStore.hide();
  });
});
</script>

<template>
  <Modal>
    <div class="grid grid-cols-[repeat(4,minmax(min-content,1fr))]
                min-w-[50vw] h-full">
      <div class="col-span-1">
        <MenuContainer class="h-full border-r border-default">
          <MenuItem v-for="settingsItem in menuItemViews"
                    :key="settingsItem.id"
                    :menu-item-view="settingsItem"
                    icon-classes="w-10"
                    class="w-full px-7 py-3 transition-colors"
                    :class="activeTab === settingsItem.id
                      ? 'bg-secondary text-inverse'
                      : 'hover:bg-hover'"
                    @click="activeTab = (settingsItem.id as SettingsItemId)"/>
        </MenuContainer>
      </div>
      <div class="col-span-3
                  p-10 overflow-y-scroll">
        <component :is="activeComponent"/>
      </div>
    </div>
  </Modal>
</template>