import {
    codes, type DeckTabId,
    type MenuLayout,
} from "@/shared/config";

export const DECK_TABS_LAYOUT = {
    menuItems: [
        {
            id: "deck-info",
            routeName: "deck-info",
            labelCode: codes.DECK_ITEM_INFO,
        },
        {
            id: "deck-flashcards",
            routeName: "deck-flashcards",
            labelCode: codes.DECK_ITEM_FLASHCARDS,
        },
        {
            id: "deck-educational-resources",
            routeName: "deck-educational-resources",
            labelCode: codes.DECK_ITEM_EDUCATIONAL_RESOURCES,
        }
    ],
    menuSections: [],
} satisfies MenuLayout<any, DeckTabId>;