import {codes, type MenuItemId} from "@/shared/config";
import type {MenuLayout} from "@/shared/config";
import {CreateFlashcardIcon} from "@/shared/ui";
import {AiGeneratedIcon} from "@/shared/ui";

export const CREATE_FLASHCARD_LAYOUT = {
    menuItems: [
        {
            id: "create-flashcard",
            labelCode: codes.TAB_ITEM_CREATE_FLASHCARD,
            icon: CreateFlashcardIcon
        },
        {
            id: "generate-flashcard",
            labelCode: codes.TAB_ITEM_GENERATE_FLASHCARD,
            icon: AiGeneratedIcon
        }
    ],
    menuSections: []
} satisfies MenuLayout<any, MenuItemId>;