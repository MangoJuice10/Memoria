<script setup lang="ts">
import {MenuContainer, MenuItem, Modal} from "@/shared/ui";
import {useSettings} from "../../model/useSettings";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {onMounted} from "vue";
import ProfileTab from "@/features/settings/ui/tabs/ProfileTab.vue";

const {settingsItems} = useSettings();

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
    <div class="grid grid-cols-[repeat(4,minmax(min-content,1fr))]">
      <div class="col-span-1">
        <MenuContainer class="h-full border-r border-default">
          <MenuItem v-for="settingsItem in settingsItems"
                    :menu-item-view="settingsItem"/>
        </MenuContainer>
      </div>
      <div class="col-span-3 p-10">
        <component :is="ProfileTab"/>
      </div>
    </div>
  </Modal>
</template>