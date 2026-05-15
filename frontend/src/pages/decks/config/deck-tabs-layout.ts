import type {MenuLayout, OptionsItemId} from "@/shared/config";
import {EditIcon, TrashIcon} from "@/shared/ui/icons";

export const baseDeckTabsKey = "";

export const OPTIONS_LAYOUT: MenuLayout<any, OptionsItemId> = {
    menuItems: [
        {
            id: "edit",
            labelCode: "edit",
            icon: EditIcon
        },
        {
            id: "delete",
            labelCode: "delete",
            icon: TrashIcon
        }
    ],
    menuSections: [],
};