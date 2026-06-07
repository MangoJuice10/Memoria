import type {FeedbackResponseDto} from "../../model/feedback-response.dto";
import type {CreateFeedbackDto} from "../../model/create-feedback.schema";
import {client, type SuccessResponse} from "@/shared/api";

export async function getFeedbackByDeck(sharedDeckId: number): Promise<FeedbackResponseDto[]> {
    const {data: {data}} = await client.get<SuccessResponse<FeedbackResponseDto[]>>(
        `/shared-decks/${sharedDeckId}/feedback`
    );
    return data;
}

export async function createFeedback(
    sharedDeckId: number,
    dto: CreateFeedbackDto
): Promise<FeedbackResponseDto> {
    const {data: {data}} = await client.post<SuccessResponse<FeedbackResponseDto>>(
        `/shared-decks/${sharedDeckId}/feedback`,
        dto
    );
    return data;
}
