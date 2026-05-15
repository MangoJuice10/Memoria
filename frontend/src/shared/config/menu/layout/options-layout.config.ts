import {type MenuLayout, type OptionsItemId} from "@/shared/config";
import {EditIcon, TrashIcon} from "@/shared/ui/icons";
import {optionsCodes} from "../codes/options-codes.config";

export const OPTIONS_LAYOUT: MenuLayout<any, OptionsItemId> = {
    menuItems: [
        {
            id: "edit",
            labelCode: optionsCodes.OPTIONS_EDIT,
            icon: EditIcon
        },
        {
            id: "delete",
            labelCode: optionsCodes.OPTIONS_DELETE,
            icon: TrashIcon
        }
    ],
    menuSections: [],
};