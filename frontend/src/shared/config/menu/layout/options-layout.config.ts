import {type MenuLayout, type OptionsItemId} from "../../menu.config";
import {optionsCodes} from "../codes/options-codes.config";
import {EditIcon, TrashIcon} from "@/shared/ui/icons";

export function createOptionsLayout(resourceName: string): MenuLayout<any, OptionsItemId> {
    return {
        menuItems: [
            {
                id: "edit",
                labelCode: optionsCodes.OPTIONS_EDIT,
                labelOptions: {
                    resourceName
                },
                icon: EditIcon
            },
            {
                id: "delete",
                labelCode: optionsCodes.OPTIONS_DELETE,
                labelOptions: {
                    resourceName
                },
                icon: TrashIcon
            }
        ],
        menuSections: [],
    };
};