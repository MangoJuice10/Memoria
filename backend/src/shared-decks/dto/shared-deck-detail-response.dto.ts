import { FlashcardResponseDto } from "../../flashcard/dto/flashcard-response.dto";
import { FeedbackResponseDto } from "../../feedback/dto/feedback-response.dto";
import { SharedDeckResponseDto } from "./shared-deck-response.dto";

export type SharedDeckDetailResponseDto = SharedDeckResponseDto & {
  flashcards: FlashcardResponseDto[];
  feedback: FeedbackResponseDto[];
};
