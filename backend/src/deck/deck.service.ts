import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDeckDto } from "src/deck/schemas/createDeck.schema";
import { UpdateDeckDto } from "src/deck/schemas";
import { DeckNotFoundError } from "src/deck/errors/deck-not-found.error";

@Injectable()
export class DeckService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, createDeckDto: CreateDeckDto) {
    return this.prismaService.deck.create({
      data: {
        ...createDeckDto,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return this.prismaService.deck.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(deckId: number) {
    const deck = await this.prismaService.deck.findUnique({
      where: {
        id: deckId,
      },
    });
    if (!deck) throw new DeckNotFoundError();

    return deck;
  }

  async update(deckId: number, updateDeckDto: UpdateDeckDto) {
    const deck = await this.prismaService.deck.findUnique({
      where: {
        id: deckId,
      },
    });
    if (!deck) throw new DeckNotFoundError();

    return this.prismaService.deck.update({
      where: {
        id: deckId,
      },
      data: updateDeckDto,
    });
  }

  async remove(deckId: number) {
    const deck = await this.prismaService.deck.findUnique({
      where: {
        id: deckId,
      },
    });
    if (!deck) throw new DeckNotFoundError();

    await this.prismaService.deck.delete({
      where: {
        id: deckId,
      },
    });
  }

  async assertOwnership(userId: number, deckId: number) {
    const deck = await this.prismaService.deck.findFirst({
      where: {
        id: deckId,
        userId
      }
    });

    if (!deck) throw new DeckNotFoundError();
  }
}
