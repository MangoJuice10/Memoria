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

export type TabItemId =
    | "deck-info"
    | "deck-flashcards"
    | "deck-educational-resources"
    | "deck-tags"
    | "deck-feedback"
    | "create-flashcard"
    | "generate-flashcard"
    | "update-flashcard"
    | "regenerate-flashcard"
    | "split-flashcard"
    | "login"
    | "register"

export type ActionsItemId =
    | "settings"
    | "change-language"
    | "change-theme"
    | "logout";

export type SettingsItemId =
    | "profile"
    | "language"
    | "theme";

export type OptionsItemId =
    | "edit"
    | "delete"
    | "rollback";

export type MenuItemId =
    | NavbarItemId
    | SidebarItemId
    | FooterItemId
    | TabItemId
    | ActionsItemId
    | SettingsItemId
    | OptionsItemId;

export type MenuItemCallback = () => void | Promise<void>;
export type MenuItemIsActive = boolean | (() => boolean | Promise<boolean>);

export type MenuItem<ItemId extends string | number> = {
    id: ItemId;
    callback?: MenuItemCallback;
    routeName?: string;
    routeParams?: Record<string, string>;
    isActive?: MenuItemIsActive;
    labelCode: MenuCode;
    labelOptions?: Record<string, unknown>;
    imageUrl?: string;
    icon?: Component;
}

export type MenuItemView<ItemId extends string | number> =
    Omit<MenuItem<ItemId>, "labelCode" | "labelOptions">
    & {
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
    labelOptions?: Record<string, unknown>;
    menuItems: MenuItem<ItemId>[];
}

export type MenuSectionView<SectionId extends string | number, ItemId extends string | number> =
    Omit<MenuSection<SectionId, ItemId>, "labelCode" | "labelOptions" | "menuItems"> & {
    label: string;
    menuItemViews: MenuItemView<ItemId>[];
}

export type MenuLayout<SectionId extends string | number, ItemId extends string | number> = {
    menuItems: MenuItem<ItemId>[];
    menuSections: MenuSection<SectionId, ItemId>[];
}