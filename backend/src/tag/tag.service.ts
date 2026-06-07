import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTagDto } from "src/tag/schemas/create-tag.schema";
import { TagResponseDto } from "src/tag/dto/tag-response.dto";

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByDeck(deckId: number): Promise<TagResponseDto[]> {
    const deckTags = await this.prismaService.deckTag.findMany({
      where: { deckId },
      include: { tag: true },
    });

    return deckTags.map(({ tag }) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    }));
  }

  async findAllByUser(userId: number): Promise<TagResponseDto[]> {
    const deckTags = await this.prismaService.deckTag.findMany({
      where: {
        deck: { userId },
      },
      include: { tag: true },
      distinct: ["tagId"],
    });

    return deckTags.map(({ tag }) => ({
      id: tag.id,
      name: tag.name,
      color: tag.color,
    }));
  }

  async createAndAttach(deckId: number, dto: CreateTagDto): Promise<TagResponseDto> {
    const tag = await this.prismaService.tag.create({
      data: {
        name: dto.name,
        color: dto.color,
        decks: {
          create: { deckId },
        },
      },
    });

    return {
      id: tag.id,
      name: tag.name,
      color: tag.color,
    };
  }

  async attachExisting(deckId: number, tagId: number): Promise<void> {
    await this.prismaService.deckTag.create({
      data: { deckId, tagId },
    });
  }

  async detach(deckId: number, tagId: number): Promise<void> {
    await this.prismaService.deckTag.delete({
      where: {
        deckId_tagId: { deckId, tagId },
      },
    });
  }
}
