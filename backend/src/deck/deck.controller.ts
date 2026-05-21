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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { User } from "src/auth/decorators";
import { DeckService } from "src/deck/deck.service";
import { createDeckSchema, type CreateDeckDto } from "src/deck/schemas/create-deck.schema";
import { ZodValidationPipe } from "src/common";
import { UpdateDeckDto, updateDeckSchema } from "src/deck/schemas";
import { DeckOwnershipGuard } from "src/deck/guards/deck-ownership.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

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

  @Get(":deckId")
  @HttpCode(200)
  @UseGuards(DeckOwnershipGuard)
  async findOne(@Param("deckId", new ParseIntPipe()) deckId: number) {
    return this.deckService.findOne(deckId);
  }

  @Patch(":deckId")
  @HttpCode(200)
  @UseGuards(DeckOwnershipGuard)
  async update(
    @Param("deckId", new ParseIntPipe()) deckId: number,
    @Body(new ZodValidationPipe(updateDeckSchema)) updateDeckDto: UpdateDeckDto,
  ) {
    return this.deckService.update(deckId, updateDeckDto);
  }

  @Delete(":deckId")
  @HttpCode(204)
  @UseGuards(DeckOwnershipGuard)
  async remove(@Param("deckId", new ParseIntPipe()) deckId: number) {
    await this.deckService.remove(deckId);
  }

  @Post(":deckId/cover")
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  async uploadCover(
    @Param("deckId", new ParseIntPipe()) deckId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.deckService.uploadCover(deckId, file);
  }

  @Delete(":deckId/cover")
  @HttpCode(200)
  async removeCover(
    @Param("deckId", new ParseIntPipe()) deckId: number
  ) {
    return this.deckService.removeCover(deckId);
  }
}
