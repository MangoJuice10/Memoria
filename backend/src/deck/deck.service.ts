import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDeckDto } from "src/deck/schemas/createDeck.schema";
import { UpdateDeckDto } from "src/deck/schemas";

@Injectable()
export class DeckService {
  constructor(private readonly prismaService: PrismaService) {}
  createDeck(userId: number, createDeckDto: CreateDeckDto) {
    return this.prismaService.deck.create({
      data: {
        ...createDeckDto,
        userId,
      },
    });
  }

  updateDeck(userId: number, deckId: number, updateDeckDto: UpdateDeckDto) {
    return this.prismaService.deck.update({
      where: {
        id: deckId,
      },
      data: {
        ...updateDeckDto,
        userId,
      },
    });
  }

  getDecks(userId: number) {
    return this.prismaService.deck.findMany({
      where: {
        userId,
      },
    });
  }
}
