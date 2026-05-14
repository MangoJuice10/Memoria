export * as decksApi from "./api/decks";
export {decksQueryKeys} from "./api/decks-query-keys.ts";
export {createCreateDeckSchema, type CreateDeckDto} from "./model/create-deck.schema";
export {createUpdateDeckSchema, type UpdateDeckDto} from "./model/update-deck.schema";
export type {DeckResponseDto} from "./model/deck-response.dto";
export {default as CreateDeck} from "./ui/CreateDeck.vue";