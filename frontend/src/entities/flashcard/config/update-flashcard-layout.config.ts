import {codes, type MenuItemId} from "@/shared/config";
import type {MenuLayout} from "@/shared/config";
import {CreateFlashcardIcon} from "@/shared/ui";
import {AiGeneratedIcon} from "@/shared/ui";
import {AiSplitIcon} from "@/shared/ui";

export const UPDATE_FLASHCARD_LAYOUT = {
    menuItems: [
        {
            id: "update-flashcard",
            labelCode: codes.TAB_ITEM_UPDATE_FLASHCARD,
            icon: CreateFlashcardIcon
        },
        {
            id: "regenerate-flashcard",
            labelCode: codes.TAB_ITEM_REGENERATE_FLASHCARD,
            icon: AiGeneratedIcon
        },
        {
            id: "split-flashcard",
            labelCode: codes.TAB_ITEM_SPLIT_FLASHCARD,
            icon: AiSplitIcon
        }
    ],
    menuSections: []
} satisfies MenuLayout<any, MenuItemId>;

export const UPDATE_TOUCHED_FLASHCARD_LAYOUT = {
    menuItems: [
        {
            id: "update-flashcard",
            labelCode: codes.TAB_ITEM_UPDATE_FLASHCARD,
            icon: CreateFlashcardIcon
        }
    ],
    menuSections: []
} satisfies MenuLayout<any, MenuItemId>;