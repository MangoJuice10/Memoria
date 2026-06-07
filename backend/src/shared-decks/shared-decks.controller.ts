import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { Public, User } from "src/auth/decorators";
import { ZodValidationPipe } from "src/common";
import { DeckCopyService } from "./deck-copy.service";
import { SharedDecksService } from "./shared-decks.service";
import {
  listSharedDecksSchema,
  type ListSharedDecksDto,
} from "./schemas/list-shared-decks.schema";

@Controller("shared-decks")
export class SharedDecksController {
  constructor(
    private readonly sharedDecksService: SharedDecksService,
    private readonly deckCopyService: DeckCopyService,
  ) {}

  @Get()
  @HttpCode(200)
  @Public()
  async findAll(
    @Query(new ZodValidationPipe(listSharedDecksSchema)) query: ListSharedDecksDto,
  ) {
    return this.sharedDecksService.findAll(query.minRating);
  }

  @Get(":sharedDeckId")
  @HttpCode(200)
  @Public()
  async findOne(
    @Param("sharedDeckId", new ParseIntPipe()) sharedDeckId: number,
  ) {
    return this.sharedDecksService.findOne(sharedDeckId);
  }

  @Post(":sharedDeckId/copy")
  @HttpCode(201)
  async copy(
    @Param("sharedDeckId", new ParseIntPipe()) sharedDeckId: number,
    @User("id") userId: number,
  ) {
    return this.deckCopyService.copy(sharedDeckId, userId);
  }
}
