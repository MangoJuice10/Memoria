import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { StorageService } from "src/storage/storage.service";
import { DeckResponseDto } from "src/deck/dto/deck-response.dto";
import { DeckCopyForbiddenError } from "./errors/deck-copy-forbidden.error";
import { SharedDeckNotFoundError } from "./errors/shared-deck-not-found.error";

@Injectable()
export class DeckCopyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async copy(sourceDeckId: number, targetUserId: number): Promise<DeckResponseDto> {
    // Fetch source deck with all related data outside the transaction
    const sourceDeck = await this.prismaService.deck.findFirst({
      where: { id: sourceDeckId, isPublic: true },
      include: {
        flashcards: true,
        tags: {
          include: { tag: true },
        },
        educationalResources: true,
      },
    });

    if (!sourceDeck) throw new SharedDeckNotFoundError();
    if (sourceDeck.userId === targetUserId) throw new DeckCopyForbiddenError();

    // Copy cover image if it exists (outside transaction since it's S3 operation)
    let newCoverKey: string | null = null;
    if (sourceDeck.coverKey) {
      newCoverKey = await this.storageService.copy(sourceDeck.coverKey, "covers");
    }

    const newDeck = await this.prismaService.$transaction(async (tx) => {
      // 1. Create the new deck
      const deck = await tx.deck.create({
        data: {
          name: sourceDeck.name,
          description: sourceDeck.description,
          coverKey: newCoverKey,
          isPublic: false,
          userId: targetUserId,
        },
        include: {
          _count: {
            select: { flashcards: true },
          },
        },
      });

      // 2. Create new flashcard records with SRS defaults
      if (sourceDeck.flashcards.length > 0) {
        await tx.flashcard.createMany({
          data: sourceDeck.flashcards.map((fc) => ({
            front: fc.front,
            back: fc.back,
            deckId: deck.id,
            repetitions: 0,
            intervalDays: 0,
            easeFactor: 2.5,
            dueAt: new Date(),
          })),
        });
      }

      // 3. Create new Tag records and DeckTag join records
      for (const { tag } of sourceDeck.tags) {
        const newTag = await tx.tag.create({
          data: {
            name: tag.name,
            color: tag.color,
          },
        });
        await tx.deckTag.create({
          data: {
            deckId: deck.id,
            tagId: newTag.id,
          },
        });
      }

      // 4. Create DeckEducationalResource join records pointing at same resources
      if (sourceDeck.educationalResources.length > 0) {
        await tx.deckEducationalResource.createMany({
          data: sourceDeck.educationalResources.map((der) => ({
            deckId: deck.id,
            educationalResourceId: der.educationalResourceId,
          })),
        });
      }

      return deck;
    });

    const coverUrl = newDeck.coverKey
      ? await this.storageService.getPresignedUrl(newDeck.coverKey)
      : null;

    /* ===== AI GENERATED CODE START ===== */
    return {
      id: newDeck.id,
      name: newDeck.name,
      description: newDeck.description,
      isPublic: newDeck.isPublic,
      coverUrl,
      flashcardsCount: newDeck._count.flashcards,
      tags: [], // Copied decks start with no tags
      createdAt: newDeck.createdAt,
      updatedAt: newDeck.updatedAt,
    };
    /* ===== AI GENERATED CODE END ===== */
  }
}
