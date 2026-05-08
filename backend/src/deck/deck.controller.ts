import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { User } from "src/auth/decorators";
import { DeckService } from "src/deck/deck.service";
import { createDeckSchema, type CreateDeckDto } from "src/deck/schemas/createDeck.schema";
import { ZodValidationPipe } from "src/common";
import { UpdateDeckDto, updateDeckSchema } from "src/deck/schemas";

@Controller("decks")
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Get()
  async getDecks(@User("id") userId: number) {
    return this.deckService.getDecks(userId);
  }

  @Post()
  @HttpCode(201)
  async createDeck(
    @User("id") userId: number,
    @Body(new ZodValidationPipe(createDeckSchema)) createDeckDto: CreateDeckDto,
  ) {
    return this.deckService.createDeck(userId, createDeckDto);
  }

  @Patch(":id")
  @HttpCode(200)
  async updateDeck(
    @User("id") userId: number,
    @Param("id", new ParseIntPipe()) deckId: number,
    @Body(new ZodValidationPipe(updateDeckSchema)) updateDeckDto: UpdateDeckDto,
  ) {
    return this.deckService.updateDeck(userId, deckId, updateDeckDto);
  }
}
