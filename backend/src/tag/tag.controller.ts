import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { User } from "src/auth/decorators";
import { DeckOwnershipGuard } from "src/deck/guards/deck-ownership.guard";
import { ZodValidationPipe } from "src/common";
import { TagService } from "src/tag/tag.service";
import { createTagSchema, type CreateTagDto } from "src/tag/schemas/create-tag.schema";
import { FeedbackService } from "src/feedback/feedback.service";

@Controller()
export class TagController {
  constructor(
    private readonly tagService: TagService,
    private readonly feedbackService: FeedbackService,
  ) {}

  @Get("decks/:deckId/tags")
  @HttpCode(200)
  @UseGuards(DeckOwnershipGuard)
  async findByDeck(@Param("deckId", ParseIntPipe) deckId: number) {
    return this.tagService.findByDeck(deckId);
  }

  @Post("decks/:deckId/tags")
  @HttpCode(201)
  @UseGuards(DeckOwnershipGuard)
  async attachOrCreate(
    @Param("deckId", ParseIntPipe) deckId: number,
    @Body() body: Record<string, unknown>,
  ) {
    if (body["id"] !== undefined) {
      const tagId = Number(body["id"]);
      await this.tagService.attachExisting(deckId, tagId);
      return;
    }

    const dto = new ZodValidationPipe(createTagSchema).transform(body, {} as any);
    return this.tagService.createAndAttach(deckId, dto as CreateTagDto);
  }

  @Delete("decks/:deckId/tags/:tagId")
  @HttpCode(204)
  @UseGuards(DeckOwnershipGuard)
  async detach(
    @Param("deckId", ParseIntPipe) deckId: number,
    @Param("tagId", ParseIntPipe) tagId: number,
  ) {
    await this.tagService.detach(deckId, tagId);
  }

  @Get("tags/my")
  @HttpCode(200)
  async findAllByUser(@User("id") userId: number) {
    return this.tagService.findAllByUser(userId);
  }

  @Get("decks/:deckId/feedback")
  @HttpCode(200)
  @UseGuards(DeckOwnershipGuard)
  async findFeedbackByDeck(@Param("deckId", ParseIntPipe) deckId: number) {
    return this.feedbackService.findByDeckOwner(deckId);
  }
}
