import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { EducationalResourceService } from "src/educational-resource/educational-resource.service";
import { DeckOwnershipGuard } from "src/deck/guards/deck-ownership.guard";

@Controller("decks/:deckId/educational-resources")
@UseGuards(DeckOwnershipGuard)
export class DeckEducationalResourceController {
  constructor(private readonly educationalResourceService: EducationalResourceService) {}

  @Get()
  @HttpCode(200)
  async findAll(@Param("deckId", ParseIntPipe) deckId: number) {
    return this.educationalResourceService.findAllByDeck(deckId);
  }

  @Post(":educationalResourceId")
  @HttpCode(200)
  async attach(
    @Param("deckId", ParseIntPipe) deckId: number,
    @Param("educationalResourceId", ParseIntPipe) educationalResourceId: number,
  ) {
    await this.educationalResourceService.attachToDeck(educationalResourceId, deckId);
  }

  @Delete(":educationalResourceId")
  @HttpCode(200)
  async detach(
    @Param("deckId", ParseIntPipe) deckId: number,
    @Param("educationalResourceId", ParseIntPipe) educationalResourceId: number,
  ) {
    await this.educationalResourceService.detachFromDeck(educationalResourceId, deckId);
  }
}
