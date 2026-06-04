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
import { FlashcardService } from "src/flashcard/services/flashcard.service";
import {
  BulkCreateFlashcardsDto,
  bulkCreateFlashcardsSchema,
  CreateFlashcardDto,
  createFlashcardSchema,
  GenerateFlashcardDto,
  generateFlashcardSchema,
  RegenerateFlashcardDto,
  regenerateFlashcardSchema,
  UpdateFlashcardDto,
  updateFlashcardSchema,
} from "./schemas";
import { DeckOwnershipGuard } from "src/deck/guards/deck-ownership.guard";
import { FlashcardOwnershipGuard } from "./guards/flashcard-ownership.guard";
import { ZodValidationPipe } from "src/common";
import { FlashcardGenerationService } from "src/flashcard/services/flashcard-generation.service";
import {
  BatchFlashcardDto,
  batchFlashcardSchema,
} from "src/flashcard/schemas/batch-flashcard.schema";
import { User } from "src/auth/decorators";
import {
  SplitFlashcardDto,
  splitFlashcardSchema,
} from "src/flashcard/schemas/split-flashcard.schema";

@UseGuards(DeckOwnershipGuard)
@Controller("decks/:deckId/flashcards")
export class FlashcardController {
  constructor(
    private readonly flashcardService: FlashcardService,
    private readonly flashcardGenerationService: FlashcardGenerationService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Param("deckId", ParseIntPipe) deckId: number,
    @Body(new ZodValidationPipe(createFlashcardSchema)) createFlashcardDto: CreateFlashcardDto,
  ) {
    return this.flashcardService.create(deckId, createFlashcardDto);
  }

  @Post("bulk")
  @HttpCode(201)
  async bulkCreate(
    @Param("deckId", ParseIntPipe) deckId: number,
    @Body(new ZodValidationPipe(bulkCreateFlashcardsSchema))
    bulkCreateFlashcardDto: BulkCreateFlashcardsDto,
  ) {
    return this.flashcardService.bulkCreate(deckId, bulkCreateFlashcardDto);
  }

  @Post("generate")
  @HttpCode(200)
  async generate(
    @Param("deckId", ParseIntPipe) deckId: number,
    @Body(new ZodValidationPipe(generateFlashcardSchema))
    generateFlashcardDto: GenerateFlashcardDto,
  ) {
    return this.flashcardGenerationService.generate(deckId, generateFlashcardDto);
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

  @Post(":flashcardId/regenerate")
  @HttpCode(200)
  async regenerate(
    @Param("flashcardId", ParseIntPipe) flashcardId: number,
    @Body(new ZodValidationPipe(regenerateFlashcardSchema))
    regenerateFlashcardDto: RegenerateFlashcardDto,
  ) {
    return this.flashcardGenerationService.regenerate(flashcardId, regenerateFlashcardDto);
  }

  @Post(":flashcardId/split")
  @HttpCode(200)
  async split(
    @Param("flashcardId", ParseIntPipe) flashcardId: number,
    @Body(new ZodValidationPipe(splitFlashcardSchema)) splitFlashcardDto: SplitFlashcardDto,
  ) {
    return this.flashcardGenerationService.split(flashcardId, splitFlashcardDto);
  }

  @Delete(":flashcardId")
  @HttpCode(204)
  @UseGuards(FlashcardOwnershipGuard)
  async remove(@Param("flashcardId", ParseIntPipe) flashcardId: number) {
    await this.flashcardService.remove(flashcardId);
  }

  @Post("batch")
  @HttpCode(200)
  async batch(
    @Param("deckId", ParseIntPipe) deckId: number,
    @Body(new ZodValidationPipe(batchFlashcardSchema)) batchFlashcardDto: BatchFlashcardDto,
  ) {
    return this.flashcardService.batch(deckId, batchFlashcardDto);
  }
}
