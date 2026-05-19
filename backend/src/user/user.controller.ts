import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { User } from "src/auth/decorators";
import { UserService } from "src/user/user.service";
import { type UserResponseDto } from "src/user/dto";
import { updateUserSchema, type UpdateUserDto } from "src/user/schemas";
import { ZodValidationPipe } from "src/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  async getMe(@User("id") userId: number): Promise<UserResponseDto> {
    return await this.userService.getCurrentUser(userId);
  }

  @Patch("me")
  async updateMe(
    @User("id") userId: number,
    @Body(new ZodValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateCurrentUser(userId, updateUserDto);
  }

  @Post("me/avatar")
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  async uploadAvatar(@User("id") userId: number, @UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(userId, file);
  }
}
