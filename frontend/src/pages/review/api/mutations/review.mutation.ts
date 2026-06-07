import {useMutation} from "@tanstack/vue-query";
import {review} from "../endpoints/review";
import type {ReviewDto} from "../../model/review.dto";

export function createReviewMutation() {
    return useMutation({
        mutationFn: ({deckId, flashcardId, reviewDto}: {
            deckId: number;
            flashcardId: number;
            reviewDto: ReviewDto;
        }) => review(deckId, flashcardId, reviewDto)
    });
}