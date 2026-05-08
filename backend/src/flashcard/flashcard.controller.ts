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
import { FlashcardService } from "src/flashcard/flashcard.service";
import { CreateFlashcardDto, UpdateFlashcardDto } from "src/flashcard/schemas";
import { DeckOwnershipGuard } from "src/deck/guards/deck-ownership.guard";
import { FlashcardOwnershipGuard } from "src/flashcard/guards/flashcard-ownership.guard";

@UseGuards(DeckOwnershipGuard)
@Controller("decks/:deckId/flashcards")
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Param("deckId", new ParseIntPipe()) deckId: number,
    @Body() createFlashcardDto: CreateFlashcardDto,
  ) {
    return this.flashcardService.create(deckId, createFlashcardDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(@Param("deckId", new ParseIntPipe()) deckId: number) {
    return this.flashcardService.findAll(deckId);
  }

  @Get(":flashcardId")
  @HttpCode(200)
  @UseGuards(FlashcardOwnershipGuard)
  async findOne(@Param("flashcardId", new ParseIntPipe()) flashcardId: number) {
    return this.flashcardService.findOne(flashcardId);
  }

  @Patch(":flashcardId")
  @HttpCode(200)
  @UseGuards(FlashcardOwnershipGuard)
  async update(
    @Param("flashcardId", new ParseIntPipe()) flashcardId: number,
    @Body() updateFlashcardDto: UpdateFlashcardDto,
  ) {
    return this.flashcardService.update(flashcardId, updateFlashcardDto);
  }

  @Delete(":flashcardId")
  @HttpCode(204)
  @UseGuards(FlashcardOwnershipGuard)
  async remove(@Param("flashcardId", new ParseIntPipe()) flashcardId: number) {
    await this.flashcardService.remove(flashcardId);
  }
}
