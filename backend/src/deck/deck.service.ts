import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDeckDto } from "src/deck/schemas/create-deck.schema";
import { UpdateDeckDto } from "src/deck/schemas";
import { DeckNotFoundError } from "src/deck/errors/deck-not-found.error";
import { DeckResponseDto } from "src/deck/dto/deck-response.dto";
import { Deck, Prisma } from "@prisma/client";
import { isPrismaNotFoundError } from "src/prisma/prisma.errors";

const deckWithFlashcardsCountQuery = {
  _count: {
    select: {
      flashcards: true,
    },
  },
};

type DeckWithFlashcardsCount = Deck & {
  _count: {
    flashcards: number;
  };
};

@Injectable()
export class DeckService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, createDeckDto: CreateDeckDto): Promise<DeckResponseDto> {
    const deck = await this.prismaService.deck.create({
      data: {
        ...createDeckDto,
        userId,
      },
      include: deckWithFlashcardsCountQuery,
    });

    return this.mapDeckWithFlashcardsCountToResponse(deck);
  }

  async findAll(userId: number): Promise<DeckResponseDto[]> {
    const decks = await this.prismaService.deck.findMany({
      where: {
        userId,
      },
      include: deckWithFlashcardsCountQuery,
    });
    return decks.map(this.mapDeckWithFlashcardsCountToResponse);
  }

  async findOne(deckId: number): Promise<DeckResponseDto> {
    const deck = await this.getDeckWithFlashcardsCountOrThrow(deckId);

    return this.mapDeckWithFlashcardsCountToResponse(deck);
  }

  async update(deckId: number, updateDeckDto: UpdateDeckDto): Promise<DeckResponseDto> {
    try {
      const updatedDeck = await this.prismaService.deck.update({
        where: {
          id: deckId,
        },
        data: updateDeckDto,
        include: deckWithFlashcardsCountQuery,
      });
      return this.mapDeckWithFlashcardsCountToResponse(updatedDeck);
    } catch (error) {
      if (isPrismaNotFoundError(error)) throw new DeckNotFoundError();
      throw error;
    }
  }

  async remove(deckId: number) {
    try {
      await this.prismaService.deck.delete({
        where: {
          id: deckId,
        },
      });
    } catch (error) {
      if (isPrismaNotFoundError(error)) throw new DeckNotFoundError();
      throw error;
    }
  }

  async assertOwnership(userId: number, deckId: number) {
    const deck = await this.prismaService.deck.findFirst({
      where: {
        id: deckId,
        userId,
      },
    });
    if (!deck) throw new DeckNotFoundError();
  }

  private async getDeckWithFlashcardsCountOrThrow(
    deckId: number,
  ): Promise<DeckWithFlashcardsCount> {
    const deck = await this.prismaService.deck.findUnique({
      where: {
        id: deckId,
      },
      include: deckWithFlashcardsCountQuery,
    });
    if (!deck) throw new DeckNotFoundError();
    return deck;
  }

  private mapDeckWithFlashcardsCountToResponse(deck: DeckWithFlashcardsCount): DeckResponseDto {
    const { _count, ...deckProperties } = deck;
    return {
      ...deckProperties,
      flashcardsCount: _count.flashcards,
    };
  }
}
