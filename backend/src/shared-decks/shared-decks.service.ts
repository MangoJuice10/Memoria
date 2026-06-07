import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { StorageService } from "src/storage/storage.service";
import { SharedDeckResponseDto } from "./dto/shared-deck-response.dto";
import { SharedDeckDetailResponseDto } from "./dto/shared-deck-detail-response.dto";
import { SharedDeckNotFoundError } from "./errors/shared-deck-not-found.error";

const sharedDeckBaseInclude = {
  user: {
    select: { id: true, username: true, avatarKey: true },
  },
  tags: {
    include: { tag: true },
  },
  feedback: true,
  _count: {
    select: { flashcards: true },
  },
} satisfies Prisma.DeckInclude;

const sharedDeckDetailInclude = {
  user: {
    select: { id: true, username: true, avatarKey: true },
  },
  tags: {
    include: { tag: true },
  },
  feedback: {
    include: {
      user: {
        select: { username: true },
      },
    },
    orderBy: { createdAt: "desc" as const },
  },
  _count: {
    select: { flashcards: true },
  },
  flashcards: true,
} satisfies Prisma.DeckInclude;

type DeckWithBaseRelations = Prisma.DeckGetPayload<{
  include: typeof sharedDeckBaseInclude;
}>;

type DeckWithDetailRelations = Prisma.DeckGetPayload<{
  include: typeof sharedDeckDetailInclude;
}>;

@Injectable()
export class SharedDecksService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async findAll(minRating?: number): Promise<SharedDeckResponseDto[]> {
    const decks = await this.prismaService.deck.findMany({
      where: { isPublic: true },
      include: sharedDeckBaseInclude,
      orderBy: { createdAt: "desc" },
    });

    const results = await Promise.all(
      decks.map((deck) => this.mapToResponseDto(deck)),
    );

    if (minRating === undefined) {
      return results;
    }

    return results.filter(
      (deck) => deck.averageRating !== null && deck.averageRating >= minRating,
    );
  }

  async findOne(deckId: number): Promise<SharedDeckDetailResponseDto> {
    const deck = await this.prismaService.deck.findFirst({
      where: { id: deckId, isPublic: true },
      include: sharedDeckDetailInclude,
    });

    if (!deck) throw new SharedDeckNotFoundError();

    return this.mapToDetailResponseDto(deck);
  }

  private async mapToResponseDto(deck: DeckWithBaseRelations): Promise<SharedDeckResponseDto> {
    const coverUrl = deck.coverKey
      ? await this.storageService.getPresignedUrl(deck.coverKey)
      : null;

    const ownerAvatarUrl = deck.user.avatarKey
      ? await this.storageService.getPresignedUrl(deck.user.avatarKey)
      : null;

    const averageRating = this.computeAverageRating(deck.feedback.map((f) => f.rating));

    return {
      id: deck.id,
      name: deck.name,
      description: deck.description,
      coverUrl,
      flashcardsCount: deck._count.flashcards,
      averageRating,
      tags: deck.tags.map(({ tag }) => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
      })),
      ownerUsername: deck.user.username,
      ownerId: deck.user.id,
      ownerAvatarUrl,
      createdAt: deck.createdAt.toISOString(),
      updatedAt: deck.updatedAt.toISOString(),
    };
  }

  private async mapToDetailResponseDto(
    deck: DeckWithDetailRelations,
  ): Promise<SharedDeckDetailResponseDto> {
    const coverUrl = deck.coverKey
      ? await this.storageService.getPresignedUrl(deck.coverKey)
      : null;

    const ownerAvatarUrl = deck.user.avatarKey
      ? await this.storageService.getPresignedUrl(deck.user.avatarKey)
      : null;

    const averageRating = this.computeAverageRating(deck.feedback.map((f) => f.rating));

    return {
      id: deck.id,
      name: deck.name,
      description: deck.description,
      coverUrl,
      flashcardsCount: deck._count.flashcards,
      averageRating,
      tags: deck.tags.map(({ tag }) => ({
        id: tag.id,
        name: tag.name,
        color: tag.color,
      })),
      ownerUsername: deck.user.username,
      ownerId: deck.user.id,
      ownerAvatarUrl,
      createdAt: deck.createdAt.toISOString(),
      updatedAt: deck.updatedAt.toISOString(),
      flashcards: deck.flashcards.map((flashcard) => ({
        id: flashcard.id,
        front: flashcard.front,
        back: flashcard.back,
        deckId: flashcard.deckId,
        intervalDays: flashcard.intervalDays,
        dueAt: flashcard.dueAt,
        createdAt: flashcard.createdAt,
        updatedAt: flashcard.updatedAt,
      })),
      feedback: deck.feedback.map((f) => ({
        id: f.id,
        content: f.content,
        rating: f.rating,
        deckId: f.deckId,
        authorUsername: f.user.username,
        createdAt: f.createdAt.toISOString(),
        updatedAt: f.updatedAt.toISOString(),
      })),
    };
  }

  private computeAverageRating(ratings: number[]): number | null {
    if (ratings.length === 0) return null;
    const sum = ratings.reduce((acc, r) => acc + r, 0);
    return sum / ratings.length;
  }
}
