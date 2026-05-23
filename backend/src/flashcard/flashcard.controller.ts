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
  Query,
  UseGuards,
} from "@nestjs/common";
import { FlashcardService } from "src/flashcard/flashcard.service";
import {
  CreateFlashcardDto,
  createFlashcardSchema,
  UpdateFlashcardDto,
  updateFlashcardSchema,
} from "src/flashcard/schemas";
import { DeckOwnershipGuard } from "src/deck/guards/deck-ownership.guard";
import { FlashcardOwnershipGuard } from "src/flashcard/guards/flashcard-ownership.guard";
import { ZodValidationPipe } from "src/common";

@UseGuards(DeckOwnershipGuard)
@Controller("decks/:deckId/flashcards")
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Param("deckId", ParseIntPipe) deckId: number,
    @Body(new ZodValidationPipe(createFlashcardSchema)) createFlashcardDto: CreateFlashcardDto,
  ) {
    return this.flashcardService.create(deckId, createFlashcardDto);
  }

  @Get()
  @HttpCode(200)
  async findAll(@Param("deckId", ParseIntPipe) deckId: number, @Query("search") search?: string) {
    return this.flashcardService.findAll(deckId, search);
  }

  @Get(":flashcardId")
  @HttpCode(200)
  @UseGuards(FlashcardOwnershipGuard)
  async findOne(@Param("flashcardId", ParseIntPipe) flashcardId: number) {
    return this.flashcardService.findOne(flashcardId);
  }

  @Patch(":flashcardId")
  @HttpCode(200)
  @UseGuards(FlashcardOwnershipGuard)
  async update(
    @Param("flashcardId", ParseIntPipe) flashcardId: number,
    @Body(new ZodValidationPipe(updateFlashcardSchema)) updateFlashcardDto: UpdateFlashcardDto,
  ) {
    return this.flashcardService.update(flashcardId, updateFlashcardDto);
  }

  @Delete(":flashcardId")
  @HttpCode(204)
  @UseGuards(FlashcardOwnershipGuard)
  async remove(@Param("flashcardId", ParseIntPipe) flashcardId: number) {
    await this.flashcardService.remove(flashcardId);
  }
}
