import {type MenuLayout, type OptionsItemId} from "../../menu.config";
import {optionsCodes} from "../codes/options-codes.config";
import {EditIcon, TrashIcon} from "@/shared/ui/icons";

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