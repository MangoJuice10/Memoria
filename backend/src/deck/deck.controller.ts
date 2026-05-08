import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { User } from "src/auth/decorators";
import { DeckService } from "src/deck/deck.service";
import { createDeckSchema, type CreateDeckDto } from "src/deck/schemas/createDeck.schema";
import { ZodValidationPipe } from "src/common";
import { UpdateDeckDto, updateDeckSchema } from "src/deck/schemas";
import { DeckOwnershipGuard } from "src/deck/guards/deck-ownership.guard";

@Controller("decks")
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  @HttpCode(201)
  async create(
    @User("id") userId: number,
    @Body(new ZodValidationPipe(createDeckSchema)) createDeckDto: CreateDeckDto,
  ) {
    return this.deckService.create(userId, createDeckDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(@User("id") userId: number) {
    return this.deckService.findAll(userId);
  }

  @Get(":id")
  @HttpCode(200)
  @UseGuards(DeckOwnershipGuard)
  async findOne(@Param("id", new ParseIntPipe()) deckId: number) {
    return this.deckService.findOne(deckId);
  }

  @Patch(":id")
  @HttpCode(200)
  @UseGuards(DeckOwnershipGuard)
  async update(
    @Param("id", new ParseIntPipe()) deckId: number,
    @Body(new ZodValidationPipe(updateDeckSchema)) updateDeckDto: UpdateDeckDto,
  ) {
    return this.deckService.update(deckId, updateDeckDto);
  }

  @Delete(":id")
  @HttpCode(204)
  @UseGuards(DeckOwnershipGuard)
  async remove(@Param("id", new ParseIntPipe()) deckId: number) {
    return this.deckService.remove(deckId);
  }
}
