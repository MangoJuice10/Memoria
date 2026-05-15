import {
    navbarItemCodes,
    sidebarSectionCodes,
    sidebarItemCodes,
    footerSectionCodes,
    footerItemCodes,
    authItemCodes,
    deckItemCodes
} from "./navigation-item-codes.config.ts";
import {settingsCodes} from "./settings-codes.config.ts";
import {optionsCodes} from "./options-codes.config.ts";
import {userPanelCodes} from "./user-panel-codes.config.ts";

export const menuCodes = {
    ...sidebarSectionCodes,
    ...footerSectionCodes,
    ...navbarItemCodes,
    ...sidebarItemCodes,
    ...footerItemCodes,
    ...authItemCodes,
    ...deckItemCodes,
    ...settingsCodes,
    ...userPanelCodes,
    ...optionsCodes,
} as const;

export type MenuCode = (typeof menuCodes)[keyof typeof menuCodes];