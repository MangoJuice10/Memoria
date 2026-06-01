import {codes} from "@/shared/config";
import {type MenuLayout, type OptionsItemId} from "@/shared/config/menu.config";
import {EditIcon, TrashIcon, BackIcon} from "@/shared/ui";

export function createFlashcardsOptionsLayout(resourceName: string): MenuLayout<any, OptionsItemId> {
    return {
        menuItems: [
            {
                id: "edit",
                labelCode: codes.OPTIONS_EDIT,
                labelOptions: {
                    resourceName
                },
                icon: EditIcon
            },
            {
                id: "delete",
                labelCode: codes.OPTIONS_DELETE,
                labelOptions: {
                    resourceName
                },
                icon: TrashIcon
            },
            {
                id: "rollback",
                labelCode: codes.OPTIONS_ROLLBACK,
                labelOptions: {
                    resourceName
                },
                icon: BackIcon
            }
        ],
        menuSections: [],
    };
};