import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  CreateEducationalResourceDto,
  createEducationalResourceSchema,
} from "src/educational-resource/schemas";
import { memoryStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ZodValidationPipe } from "src/common";
import { User } from "src/auth/decorators";
import { EducationalResourceService } from "src/educational-resource/educational-resource.service";
import { EducationalResourceOwnershipGuard } from "src/educational-resource/guards/educational-resource-ownership.guard";
import {
  UpdateEducationalResourceDto,
  updateEducationalResourceSchema,
} from "src/educational-resource/schemas/update-educational-resource.schema";

@Controller("educational-resources")
export class EducationalResourceController {
  constructor(private readonly educationalResourceService: EducationalResourceService) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  async create(
    @User("id") userId: number,
    @Body(new ZodValidationPipe(createEducationalResourceSchema))
    createEducationalResourceDto: CreateEducationalResourceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.educationalResourceService.create(createEducationalResourceDto, file, userId);
  }

  @Get()
  @HttpCode(200)
  async findAll(@User("id") userId: number, @Query("search") search?: string) {
    return this.educationalResourceService.findAll(userId, search);
  }

  @Get(":educationalResourceId")
  @HttpCode(200)
  @UseGuards(EducationalResourceOwnershipGuard)
  async findOne(@Param("educationalResourceId", ParseIntPipe) educationalResourceId: number) {
    return this.educationalResourceService.findOne(educationalResourceId);
  }

  @Patch(":educationalResourceId")
  @HttpCode(200)
  @UseGuards(EducationalResourceOwnershipGuard)
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  async update(
    @Param("educationalResourceId", ParseIntPipe) educationalResourceId: number,
    @Body(new ZodValidationPipe(updateEducationalResourceSchema))
    updateEducationalResourceDto: UpdateEducationalResourceDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.educationalResourceService.update(
      educationalResourceId,
      updateEducationalResourceDto,
      file,
    );
  }

  @Delete(":educationalResourceId")
  @HttpCode(204)
  @UseGuards(EducationalResourceOwnershipGuard)
  async remove(@Param("educationalResourceId", ParseIntPipe) educationalResourceId: number) {
    await this.educationalResourceService.remove(educationalResourceId);
  }

  @Post(":educationalResourceId/cover")
  @HttpCode(200)
  @UseGuards(EducationalResourceOwnershipGuard)
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  async uploadCover(
    @Param("educationalResourceId", ParseIntPipe) educationalResourceId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.educationalResourceService.uploadCover(educationalResourceId, file);
  }

  @Delete(":educationalResourceId/cover")
  @HttpCode(200)
  @UseGuards(EducationalResourceOwnershipGuard)
  async removeCover(@Param("educationalResourceId", ParseIntPipe) educationalResourceId: number) {
    return this.educationalResourceService.removeCover(educationalResourceId);
  }
}
