import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFlashcardDto, UpdateFlashcardDto } from "src/flashcard/schemas";
import { FlashcardNotFoundError } from "src/flashcard/errors";
import { DeckNotFoundError } from "src/deck/errors/deck-not-found.error";

@Injectable()
export class FlashcardService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(deckId: number, createFlashcardDto: CreateFlashcardDto) {
    return this.prismaService.flashcard.create({
      data: {
        ...createFlashcardDto,
        deckId,
      },
    });
  }

  async findOne(flashcardId: number) {
    const flashcard = await this.prismaService.flashcard.findUnique({
      where: {
        id: flashcardId,
      },
    });
    if (!flashcard) throw new FlashcardNotFoundError();

    return flashcard;
  }

  async findAll(deckId: number) {
    return this.prismaService.flashcard.findMany({
      where: {
        deckId,
      },
    });
  }

  async update(flashcardId: number, updateFlashcardDto: UpdateFlashcardDto) {
    const flashcard = await this.prismaService.flashcard.findUnique({
      where: {
        id: flashcardId,
      },
    });
    if (!flashcard) throw new FlashcardNotFoundError();

    return this.prismaService.flashcard.update({
      where: {
        id: flashcardId,
      },
      data: updateFlashcardDto,
    });
  }

  async remove(flashcardId: number) {
    const flashcard = await this.prismaService.flashcard.findUnique({
      where: {
        id: flashcardId,
      },
    });
    if (!flashcard) throw new FlashcardNotFoundError();

    await this.prismaService.flashcard.delete({
      where: {
        id: flashcardId,
      },
    });
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
}
