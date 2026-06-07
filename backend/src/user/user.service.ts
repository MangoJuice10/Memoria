import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "src/user/schemas";
import { AuthService } from "src/auth/services/auth.service";
import { EmailAlreadyExistsError, InvalidPasswordError, UserNotFoundError } from "src/user/errors";
import { Prisma, User } from "@prisma/client";
import { validationErrorCodes } from "src/common/constants";
import { email } from "zod";
import { UserResponseDto } from "src/user/dto";
import { StorageService } from "src/storage/storage.service";
import { DeckResponseDto } from "src/deck/dto/deck-response.dto";

const userResponseDtoSelect: Prisma.UserSelect = {
  id: true,
  username: true,
  email: true,
  avatarKey: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
  ) {}

  async getCurrentUser(userId: number): Promise<UserResponseDto> {
    const user = await this.getUserOrThrow(userId, userResponseDtoSelect);
    return this.mapToResponse(user);
  }

  async updateCurrentUser(
    userId: number,
    { newUsername, newEmail, oldPassword, newPassword }: UpdateUserDto,
  ): Promise<UserResponseDto> {
    await this.getUserOrThrow(userId, { id: true });

    const newUser: Partial<User> = {};

    if (newUsername) newUser.username = newUsername;

    if (newEmail) {
      const isEmailAvailable = await this.authService.checkEmailAvailability(newEmail);
      const isOwnEmail = await this.authService.checkEmailOwnership(userId, newEmail);
      if (!isEmailAvailable && !isOwnEmail)
        throw new EmailAlreadyExistsError([
          {
            path: "newEmail",
            code: validationErrorCodes.EMAIL_ALREADY_EXISTS,
            message: "Email already exists",
          },
        ]);

      newUser.email = newEmail;
    }

    if (oldPassword && newPassword) {
      const oldPasswordMatches = await this.authService.checkPassword(userId, oldPassword);
      if (!oldPasswordMatches)
        throw new InvalidPasswordError([
          {
            path: "oldPassword",
            code: validationErrorCodes.INVALID_PASSWORD,
            message: "The password is invalid",
          },
        ]);

      newUser.passwordHash = await this.authService.hash(newPassword);
    }

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...newUser,
      },
      select: userResponseDtoSelect,
    });

    return this.mapToResponse(updatedUser);
  }

  public async uploadAvatar(userId: number, file: Express.Multer.File): Promise<UserResponseDto> {
    const user = await this.getUserOrThrow(userId, {
      avatarKey: true,
    });

    if (user.avatarKey) await this.storageService.delete(user.avatarKey).catch(() => {});

    const avatarKey = await this.storageService.upload(file, "avatars");

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        avatarKey,
      },
      select: userResponseDtoSelect,
    });

    return this.mapToResponse(updatedUser);
  }

  async removeAvatar(userId: number): Promise<UserResponseDto> {
    const { avatarKey } = await this.getUserOrThrow(userId, {
      avatarKey: true,
    });

    if (avatarKey) await this.storageService.delete(avatarKey);

    const updatedUser = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        avatarKey: null,
      },
      select: userResponseDtoSelect,
    });

    return this.mapToResponse(updatedUser);
  }

  private async getUserOrThrow(userId: number, select: Prisma.UserSelect): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select,
    });
    if (!user) throw new UserNotFoundError();
    return user;
  }

  private async mapToResponse(user: User): Promise<UserResponseDto> {
    const avatarUrl = user.avatarKey
      ? await this.storageService.getPresignedUrl(user.avatarKey)
      : null;
    return {
      ...user,
      avatarUrl,
    };
  }
}
