import {
    codes, type TabItemId,
    type MenuLayout,
} from "@/shared/config";
import {DeckInfoIcon, DeckFeedbackIcon, FlashcardsIcon, LinkIcon} from "@/shared/ui";

export const DECK_LAYOUT = {
    menuItems: [
        {
            id: "deck-info",
            routeName: "deck-info",
            labelCode: codes.TAB_ITEM_INFO,
            icon: DeckInfoIcon
        },
        {
            id: "deck-flashcards",
            routeName: "deck-flashcards",
            labelCode: codes.TAB_ITEM_FLASHCARDS,
            icon: FlashcardsIcon
        },
        {
            id: "deck-educational-resources",
            routeName: "deck-educational-resources",
            labelCode: codes.TAB_ITEM_EDUCATIONAL_RESOURCES,
            icon: LinkIcon
        },
        {
            id: "deck-feedback",
            routeName: "deck-feedback",
            labelCode: codes.TAB_ITEM_FEEDBACK,
            icon: DeckFeedbackIcon
        }
    ],
    menuSections: [],
} satisfies MenuLayout<any, TabItemId>;