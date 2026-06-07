import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFeedbackDto } from "src/feedback/schemas/create-feedback.schema";
import { FeedbackResponseDto } from "src/feedback/dto/feedback-response.dto";
import { FeedbackForbiddenError } from "src/feedback/errors/feedback-forbidden.error";
import { SharedDeckNotFoundError } from "src/shared-decks/errors/shared-deck-not-found.error";
import { Feedback, User } from "@prisma/client";

type FeedbackWithUser = Feedback & {
  user: Pick<User, "username">;
};

@Injectable()
export class FeedbackService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByDeck(deckId: number): Promise<FeedbackResponseDto[]> {
    await this.getPublicDeckOrThrow(deckId);
    return this.queryFeedback(deckId);
  }

  /** Owner-scoped: returns feedback for any deck the caller owns, public or not. */
  async findByDeckOwner(deckId: number): Promise<FeedbackResponseDto[]> {
    return this.queryFeedback(deckId);
  }

  private async queryFeedback(deckId: number): Promise<FeedbackResponseDto[]> {
    const feedbacks = await this.prismaService.feedback.findMany({
      where: { deckId },
      include: {
        user: {
          select: { username: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return feedbacks.map(this.mapToResponseDto);
  }

  async create(
    deckId: number,
    userId: number,
    dto: CreateFeedbackDto,
  ): Promise<FeedbackResponseDto> {
    const deck = await this.getPublicDeckOrThrow(deckId);

    if (deck.userId === userId) {
      throw new FeedbackForbiddenError();
    }

    const feedback = await this.prismaService.feedback.create({
      data: {
        content: dto.content,
        rating: dto.rating,
        deckId,
        userId,
      },
      include: {
        user: {
          select: { username: true },
        },
      },
    });

    return this.mapToResponseDto(feedback);
  }

  private async getPublicDeckOrThrow(deckId: number) {
    const deck = await this.prismaService.deck.findFirst({
      where: { id: deckId, isPublic: true },
    });

    if (!deck) throw new SharedDeckNotFoundError();

    return deck;
  }

  private mapToResponseDto(feedback: FeedbackWithUser): FeedbackResponseDto {
    return {
      id: feedback.id,
      content: feedback.content,
      rating: feedback.rating,
      deckId: feedback.deckId,
      authorUsername: feedback.user.username,
      createdAt: feedback.createdAt.toISOString(),
      updatedAt: feedback.updatedAt.toISOString(),
    };
  }
}
