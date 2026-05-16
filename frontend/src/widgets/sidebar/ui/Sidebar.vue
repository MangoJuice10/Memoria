<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useI18n} from "vue-i18n";
import {useViewerStore} from "@/entities/viewer";
import {LocalizedLink, Logo, SpacedRepetitionFeatureIcon} from "@/shared/ui";
import {BurgerMenu} from "@/shared/ui";
import SidebarSections from "./SidebarSections.vue";
import {UserPanel} from "@/features/settings";
import {useBackdropStore} from "@/shared/model";
import {useSidebarStore} from "@/shared/model";
import {Resizable} from "@/shared/resizable";
import {SIDEBAR_GUEST_LAYOUT} from "../config/sidebar-layout.config.ts";
import {decksApi} from "@/entities/deck";
import {useMenu} from "@/shared/lib";
import {useQuery} from "@tanstack/vue-query";
import {decksQueryKeys} from "@/entities/deck";
import {
  menuCodes,
  type MenuSectionView,
  type SidebarSectionId
} from "@/shared/config";
import {watch, type ComputedRef, computed} from "vue";
import {codeToKey} from "@/shared/i18n";

const {t} = useI18n();

const {isAuthenticated} = storeToRefs(useViewerStore());

const sidebarStore = useSidebarStore();
const backdropStore = useBackdropStore();

const {data} = useQuery({
  queryKey: decksQueryKeys.all,
  queryFn: () => decksApi.findAll(),
  enabled: isAuthenticated.value
});

const {menuSectionViews: guestSectionViews} = useMenu(SIDEBAR_GUEST_LAYOUT, t);

const menuSectionViews = computed(() => {
  if (!isAuthenticated.value) return guestSectionViews.value;

  const decksSectionView: MenuSectionView<SidebarSectionId, string | number> = {
    id: "decks",
    label: t(codeToKey(menuCodes.SIDEBAR_SECTION_DECKS)),
    menuItemViews: (data.value ?? []).map((deck) => ({
      id: deck.id,
      label: deck.name,
      routeName: "deck",
      routeParams: {
        deckId: String(deck.id)
      },
      icon: SpacedRepetitionFeatureIcon
    })),
  };
  return [decksSectionView];
});

function handleToggle() {
  sidebarStore.toggle();

  if (sidebarStore.isVisible) backdropStore.show();
  else backdropStore.hide();
  backdropStore.setCallback(() => {
    sidebarStore.hide();
  });
}
</script>

<template>
  <aside class="fixed inset-y-0 left-0 z-40
                w-fit border-r border-default
                bg-primary
                transition-all duration-400"
         :class="sidebarStore.isVisible
                 ? 'opacity-100 translate-y-0'
                 : 'opacity-0 -translate-x-10 pointer-events-none'">
    <Resizable has-right-resize-handle
               class="w-sidebar min-w-[25vw] h-sidebar">
      <div class="flex flex-col">
        <div class="flex items-center gap-1 w-full h-navbar px-sidebar border-b border-default">
          <BurgerMenu @toggle="handleToggle"/>
          <LocalizedLink name="home" class="block h-full min-w-0 max-w-full max-h-full">
            <Logo has-logotype logotype-classes="max-lg:hidden" class="shrink-0 py-2"/>
          </LocalizedLink>
        </div>
        <div class="h-full overflow-auto px-sidebar">
          <SidebarSections :menu-section-views="menuSectionViews"/>
        </div>
        <UserPanel v-if="isAuthenticated"/>
      </div>
    </Resizable>
  </aside>
</template>