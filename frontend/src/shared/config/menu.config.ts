import type {Component} from "vue";
import type {MenuCode} from "@/shared/config/menu/codes/menu-codes.config.ts";

export type NavbarItemId =
    | "feature-spaced-repetition"
    | "feature-ai-assistance"
    | "feature-trustworthy-answers"
    | "decks"
    | "shared-decks"
    | "educational-resources"

export type SidebarItemId =
    | "feature-spaced-repetition"
    | "feature-ai-assistance"
    | "feature-trustworthy-answers"
    | "feature-statistics"
    | "about"

export type FooterItemId =
    | "feature-spaced-repetition"
    | "feature-ai-assistance"
    | "feature-trustworthy-answers"
    | "feature-statistics"

export type ActionsItemId =
    | "settings"
    | "change-language"
    | "change-theme"
    | "logout";

export type SettingsItemId =
    | "profile"
    | "language"
    | "theme";

export type AuthId =
    | "login"
    | "register"

export type DeckTabId =
    | "deck-info"
    | "deck-flashcards"
    | "deck-educational-resources"

export type OptionsItemId =
    | "edit"
    | "delete";

export type MenuItem<ItemId extends string | number> = {
    id: ItemId;
    routeName?: string;
    routeParams?: Record<string, string>;
    callback?: () => void | Promise<void>;
    labelCode: MenuCode;
    icon?: Component;
}

export type MenuItemView<ItemId extends string | number> = Omit<MenuItem<ItemId>, "labelCode"> & {
    label: string;
}

export type SidebarSectionId =
    | "features"
    | "about"
    | "decks";

export type FooterSectionId =
    | "features";

export type MenuSection<SectionId extends string | number, ItemId extends string | number> = {
    id: SectionId;
    labelCode: MenuCode;
    menuItems: MenuItem<ItemId>[];
}

export type MenuSectionView<SectionId extends string | number, ItemId extends string | number> =
    Omit<MenuSection<SectionId, ItemId>, "labelCode" | "menuItems"> & {
    label: string;
    menuItemViews: MenuItemView<ItemId>[];
}

export type MenuLayout<SectionId extends string | number, ItemId extends string | number> = {
    menuItems: MenuItem<ItemId>[];
    menuSections: MenuSection<SectionId, ItemId>[];
}