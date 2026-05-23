import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFlashcardDto, UpdateFlashcardDto } from "src/flashcard/schemas";
import { FlashcardNotFoundError } from "src/flashcard/errors";
import { FlashcardResponseDto } from "src/flashcard/dto";
import { Flashcard } from "@prisma/client";
import { isPrismaNotFoundError } from "src/prisma/prisma.errors";

@Injectable()
export class FlashcardService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    deckId: number,
    createFlashcardDto: CreateFlashcardDto,
  ): Promise<FlashcardResponseDto> {
    const createdFlashcard = await this.prismaService.flashcard.create({
      data: {
        ...createFlashcardDto,
        deckId,
      },
    });
    return this.mapFlashcardToResponse(createdFlashcard);
  }

  async findOne(flashcardId: number): Promise<FlashcardResponseDto> {
    const flashcard = await this.getFlashcardOrThrow(flashcardId);
    return this.mapFlashcardToResponse(flashcard);
  }

  async findAll(deckId: number, search?: string): Promise<FlashcardResponseDto[]> {
    const flashcards = await this.prismaService.flashcard.findMany({
      where: {
        deckId,
        ...(search && {
          OR: [
            {
              front: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              back: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
      },
    });
    return flashcards.map(this.mapFlashcardToResponse.bind(this));
  }

  async update(
    flashcardId: number,
    updateFlashcardDto: UpdateFlashcardDto,
  ): Promise<FlashcardResponseDto> {
    try {
      const updatedFlashcard = await this.prismaService.flashcard.update({
        where: {
          id: flashcardId,
        },
        data: updateFlashcardDto,
      });
      return this.mapFlashcardToResponse(updatedFlashcard);
    } catch (error) {
      if (isPrismaNotFoundError(error)) throw new FlashcardNotFoundError();
      throw error;
    }
  }

  async remove(flashcardId: number) {
    try {
      await this.prismaService.flashcard.delete({
        where: {
          id: flashcardId,
        },
      });
    } catch (error) {
      if (isPrismaNotFoundError(error)) throw new FlashcardNotFoundError();
      throw error;
    }
  }

  async assertOwnership(deckId: number, flashcardId: number) {
    const flashcard = await this.prismaService.flashcard.findFirst({
      where: {
        id: flashcardId,
        deckId,
      },
    });
    if (!flashcard) throw new FlashcardNotFoundError();
  }

  private async getFlashcardOrThrow(flashcardId: number): Promise<Flashcard> {
    const flashcard = await this.prismaService.flashcard.findUnique({
      where: {
        id: flashcardId,
      },
    });
    if (!flashcard) throw new FlashcardNotFoundError();
    return flashcard;
  }

  private mapFlashcardToResponse(flashcard: Flashcard): FlashcardResponseDto {
    const { id, front, back, deckId, intervalDays, dueAt, createdAt, updatedAt } = flashcard;
    return {
      id,
      front,
      back,
      deckId,
      intervalDays,
      dueAt,
      createdAt,
      updatedAt,
    };
  }
}
