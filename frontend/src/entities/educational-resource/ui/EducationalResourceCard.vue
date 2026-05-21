<script setup lang="ts">
import {EducationalResourceFillerIcon} from "@/shared/ui";
import {Dropdown, MenuContainer, MenuItem} from "@/shared/ui";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {defineAsyncComponent} from "vue";
import {getMenuItemViewOrThrow, showOne, useMenu} from "@/shared/lib";
import {OptionsIcon} from "@/shared/ui/icons";
import {useI18n} from "vue-i18n";
import {codes, createOptionsLayout} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

const props = defineProps<{
  id: number;
  name: string;
  description: string;
  fileUrl: string;
  coverUrl?: string | null;
  createdAt: string;
}>();

const {t} = useI18n();

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

const {menuItemViews} = useMenu(createOptionsLayout(t(codeToKey(codes.EDUCATIONAL_RESOURCE_RESOURCE_NAME))), t);

function setupMenuCallbacks() {
  const editItem = getMenuItemViewOrThrow(menuItemViews.value, "edit");
  editItem.callback = openUpdateEducationalResourceModal;

  const deleteItem = getMenuItemViewOrThrow(menuItemViews.value, "delete");
  deleteItem.callback = openDeleteEducationalResourceModal;
}

const openUpdateEducationalResourceModal = () => {
  const updateEducationalResourceModal = defineAsyncComponent(() => import("./modals/UpdateEducationalResourceModal.vue"));
  showOne(backdropStore);
  modalStore.show(updateEducationalResourceModal, {
    id: props.id,
    name: props.name,
    description: props.description,
    coverUrl: props.coverUrl
  });
};

const openDeleteEducationalResourceModal = () => {
  const deleteEducationalResourceModal = defineAsyncComponent(() => import("./modals/DeleteEducationalResourceModal.vue"));
  showOne(backdropStore);
  modalStore.show(deleteEducationalResourceModal, {
    id: props.id,
  });
};

setupMenuCallbacks();
</script>

<template>
  <div class="group/educational-resource
              relative
              w-educational-resource h-educational-resource
              cursor-pointer
              transition duration-200
              hover:scale-105"
       @click="openUpdateEducationalResourceModal">
    <div class="flex justify-end
                absolute bottom-5 right-2
                px-4 py-2 border-b-0
                opacity-0
                transition-all duration-300
                group-hover/educational-resource:opacity-100"
                @click.stop>
      <Dropdown side="top"
                align="left"
                :gap-rem="1.25"
                trigger-classes="p-1 border rounded-full border-default
                                 bg-primary">
        <template #trigger>
          <OptionsIcon class="w-5 h-5"/>
        </template>
        <template #menu>
          <MenuContainer class="overflow-hidden border border-default rounded-2xl text-xs">
            <MenuItem v-for="optionsItemView in menuItemViews"
                      :menu-item-view="optionsItemView"
                      icon-classes="w-5"
                      label-classes="whitespace-nowrap"
                      class="px-3 py-1"
                      @click="optionsItemView.callback"/>
          </MenuContainer>
        </template>
      </Dropdown>
    </div>
    <img v-if="coverUrl"
         :src="coverUrl" alt=""
         class="w-full h-full object-fit">
    <div v-else>
      <EducationalResourceFillerIcon class="icon-dynamic-inverse
                                            w-full h-full"/>
      <span class="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2
                text-lg text-center line-clamp-5">
        {{ name }}
      </span>
    </div>
  </div>
</template>