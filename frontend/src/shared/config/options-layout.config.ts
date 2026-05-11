import type {MenuLayout, OptionsItemId} from "@/shared/config";
import {EditIcon, TrashIcon} from "@/shared/ui/icons";

export const baseOptionsKey = "options";

export const OPTIONS_LAYOUT: MenuLayout<any, OptionsItemId> = {
    menuItems: [
        {
            id: "edit",
            labelKey: "edit",
            icon: EditIcon
        },
        {
            id: "delete",
            labelKey: "delete",
            icon: TrashIcon
        }
    ],
    baseItemsKey: baseOptionsKey,
    menuSections: [],
    baseSectionsKey: ""
};