<script setup lang="ts">
import {
  createEducationalResourceOptionsLayout
} from "@/entities/educational-resource/config/educational-resource-options-layout.config";
import {DropdownMenu, EducationalResourceFillerIcon} from "@/shared/ui";
import {useBackdropStore, useModalStore} from "@/shared/model";
import {defineAsyncComponent} from "vue";
import {getMenuItemViewOrThrow, showOne, useMenu} from "@/shared/lib";
import {OptionsIcon} from "@/shared/ui/icons";
import {useI18n} from "vue-i18n";
import {codes} from "@/shared/config";
import {codeToKey} from "@/shared/i18n";

const props = defineProps<{
  id: number;
  name: string;
  description: string;
  fileUrl: string;
  coverUrl: string | null;
  originalFilename: string;
  createdAt: string;
}>();

const {t} = useI18n();

const modalStore = useModalStore();
const backdropStore = useBackdropStore();

const {menuItemViews} = useMenu(createEducationalResourceOptionsLayout(t(codeToKey(codes.EDUCATIONAL_RESOURCE_RESOURCE_NAME))), t);

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
    coverUrl: props.coverUrl,
    originalFilename: props.originalFilename
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
                group-hover/educational-resource:opacity-100"
         @click.stop>
      <DropdownMenu :menu-item-views
                    side="top"
                    align="left"
                    :gap-rem="1.25"
                    dropdown-trigger-classes="p-1 border rounded-full border-default
                                              bg-primary"
                    menu-container-classes="divide-y divide-default
                                            overflow-hidden border border-default rounded-2xl
                                            text-xs
                                            bg-tertiary"
                    menu-item-classes="flex items-center
                                       w-full h-10 px-3 py-1
                                       hover:bg-hover"
                    menu-item-icon-classes="w-5 h-5"
                    menu-item-label-classes="whitespace-nowrap"
                    class="z-3">
        <OptionsIcon class="w-5 h-5"/>
      </DropdownMenu>
    </div>
    <div
        class="relative
                w-full h-full">
      <EducationalResourceFillerIcon class="icon-dynamic-inverse
                                            w-full h-full"/>
      <div class="absolute inset-0 z-1
                  pt-[18.5%] pl-[19%] pr-[2.5%] pb-[6.1%]">
        <div class="relative
                    w-full h-full">
          <div class="absolute inset-0
                      bg-(--color-primary)/25"/>
          <img v-if="coverUrl" :src="coverUrl" alt=""
               class="w-full h-full object-fit">
        </div>
      </div>
      <div class="flex justify-center items-center
                  absolute inset-0 z-2">
        <span class="educational-resource-name-outline
                     absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2
                     text-lg font-semibold text-center line-clamp-5
                     drop-shadow-[0px_0px_3px_var(--color-primary)]">
          {{ name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.educational-resource-name-outline {
  text-shadow: -1px -1px 0 var(--color-primary),
  1px -1px 0 var(--color-primary),
  -1px 1px 0 var(--color-primary),
  1px 1px 0 var(--color-primary)
}
</style>