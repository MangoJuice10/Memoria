import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { StorageService } from "src/storage/storage.service";
import { EducationalResourceResponseDto } from "src/educational-resource/dto";
import { EducationalResource } from "@prisma/client";
import { CreateEducationalResourceDto } from "src/educational-resource/schemas";
import { EducationalResourceNotFoundError } from "src/educational-resource/errors";
import { isPrismaNotFoundError } from "src/prisma/prisma.errors";
import { NotFoundError } from "src/common/errors";
import { notFoundErrorCodes } from "src/common/constants";
import { UpdateEducationalResourceDto } from "src/educational-resource/schemas/update-educational-resource.schema";
import { DocumentParserService } from "src/document-parser/document-parser.service";
import { VectorStoreService } from "src/vector-store/vector-store.service";

@Injectable()
export class EducationalResourceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
    private readonly documentParserService: DocumentParserService,
    private readonly vectorStoreService: VectorStoreService,
  ) {}

  async create(
    createEducationalResourceDto: CreateEducationalResourceDto,
    file: Express.Multer.File,
    userId: number,
  ): Promise<EducationalResourceResponseDto> {
    const fileKey = await this.storageService.upload(file, "educational-resources");

    let createdEducationalResource: EducationalResource | null = null;

    try {
      createdEducationalResource = await this.prismaService.educationalResource.create({
        data: {
          ...createEducationalResourceDto,
          fileKey,
          originalFilename: file.originalname,
          userId,
        },
      });

      const chunks = await this.documentParserService.extractAndChunk(
        file.buffer,
        file.originalname,
      );

      await this.vectorStoreService.addDocuments(
        {
          educationalResourceId: createdEducationalResource.id,
          educationalResourceName: createdEducationalResource.name,
          educationalResourceOriginalFilename: createdEducationalResource.originalFilename,
        },
        chunks,
      );

      return this.mapToResponse(createdEducationalResource);
    } catch (error) {
      if (createdEducationalResource) {
        await this.vectorStoreService.deleteByResourceId(createdEducationalResource.id);
        await this.prismaService.educationalResource.delete({
          where: {
            id: createdEducationalResource.id,
          },
        });
      }

      await this.storageService.delete(fileKey);
      throw error;
    }
  }

  async findAll(userId: number, search?: string): Promise<EducationalResourceResponseDto[]> {
    const educationalResources = await this.prismaService.educationalResource.findMany({
      where: {
        userId,
        ...(search && {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
      },
      orderBy: { updatedAt: "desc" },
    });

    return Promise.all(educationalResources.map(this.mapToResponse.bind(this)));
  }

  async findAllByDeck(deckId: number): Promise<EducationalResourceResponseDto[]> {
    const links = await this.prismaService.deckEducationalResource.findMany({
      where: {
        deckId,
      },
      include: {
        educationalResource: true,
      },
    });

    return Promise.all(
      links.map(({ educationalResource }) => this.mapToResponse(educationalResource)),
    );
  }

  async findOne(educationalResourceId: number): Promise<EducationalResourceResponseDto> {
    const educationalResource = await this.getEducationalResourceOrThrow(educationalResourceId);
    return this.mapToResponse(educationalResource);
  }

  async update(
    educationalResourceId: number,
    educationalResourceUpdateDto: UpdateEducationalResourceDto,
  ): Promise<UpdateEducationalResourceDto> {
    try {
      const updatedEducationalResource = await this.prismaService.educationalResource.update({
        where: {
          id: educationalResourceId,
        },
        data: educationalResourceUpdateDto,
      });

      return this.mapToResponse(updatedEducationalResource);
    } catch (error) {
      if (isPrismaNotFoundError(error)) throw EducationalResourceNotFoundError;
      throw error;
    }
  }

  async remove(educationalResourceId: number) {
    const { fileKey, coverKey } = await this.getEducationalResourceOrThrow(educationalResourceId);

    await this.storageService.delete(fileKey);
    if (coverKey) await this.storageService.delete(coverKey);

    await this.vectorStoreService.deleteByResourceId(educationalResourceId);

    await this.prismaService.educationalResource.delete({
      where: {
        id: educationalResourceId,
      },
    });
  }

  async uploadCover(
    educationalResourceId: number,
    file: Express.Multer.File,
  ): Promise<EducationalResourceResponseDto> {
    const educationalResource = await this.getEducationalResourceOrThrow(educationalResourceId);

    if (educationalResource.coverKey)
      await this.storageService.delete(educationalResource.coverKey).catch(() => {});

    const coverKey = await this.storageService.upload(file, "educational-resource-covers");

    const updatedEducationalResource = await this.prismaService.educationalResource.update({
      where: {
        id: educationalResourceId,
      },
      data: {
        coverKey,
      },
    });

    return this.mapToResponse(updatedEducationalResource);
  }

  async removeCover(educationalResourceId: number): Promise<EducationalResourceResponseDto> {
    const { coverKey } = await this.getEducationalResourceOrThrow(educationalResourceId);

    if (coverKey) await this.storageService.delete(coverKey);

    const updatedEducationalResource = await this.prismaService.educationalResource.update({
      where: {
        id: educationalResourceId,
      },
      data: {
        coverKey: null,
      },
    });

    return this.mapToResponse(updatedEducationalResource);
  }

  async attachToDeck(educationalResourceId: number, deckId: number) {
    await this.getEducationalResourceOrThrow(educationalResourceId);
    await this.prismaService.deckEducationalResource.upsert({
      where: {
        deckId_educationalResourceId: {
          deckId,
          educationalResourceId,
        },
      },
      create: {
        deckId,
        educationalResourceId,
      },
      update: {},
    });
  }

  async detachFromDeck(educationalResourceId: number, deckId: number) {
    try {
      await this.prismaService.deckEducationalResource.delete({
        where: {
          deckId_educationalResourceId: {
            deckId,
            educationalResourceId,
          },
        },
      });
    } catch (error) {
      if (isPrismaNotFoundError(error))
        throw new NotFoundError(
          "The association between the deck and the educational resource not found",
          notFoundErrorCodes.DECK_EDUCATIONAL_RESOURCE_NOT_FOUND,
        );
      throw error;
    }
  }

  async assertOwnership(userId: number, educationalResourceId: number) {
    const educationalResource = await this.prismaService.educationalResource.findFirst({
      where: {
        id: educationalResourceId,
        userId,
      },
    });
    if (!educationalResource) throw new EducationalResourceNotFoundError();
  }

  private async getEducationalResourceOrThrow(
    educationalResourceId: number,
  ): Promise<EducationalResource> {
    const educationalResource = await this.prismaService.educationalResource.findUnique({
      where: {
        id: educationalResourceId,
      },
    });
    if (!educationalResource) throw new EducationalResourceNotFoundError();

    return educationalResource;
  }

  private async mapToResponse(
    educationalResource: EducationalResource,
  ): Promise<EducationalResourceResponseDto> {
    const { fileKey, coverKey, ...educationalResourceProperties } = educationalResource;
    const fileUrl = await this.storageService.getPresignedUrl(fileKey);
    const coverUrl = coverKey ? await this.storageService.getPresignedUrl(coverKey) : null;

    return {
      ...educationalResourceProperties,
      fileUrl,
      coverUrl,
    };
  }
}
