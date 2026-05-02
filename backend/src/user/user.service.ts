import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "src/user/schemas";
import { AuthService } from "src/auth/services/auth.service";
import { EmailAlreadyExistsError, InvalidPasswordError, UserNotFoundError } from "src/user/errors";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async getCurrentUser(userId: number) {
    const user = await this.prismaService.user.findUnique({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: userId,
      },
    });
    if (!user) throw new UserNotFoundError(userId);

    return user;
  }

  async updateUser(userId: number, { newUsername, newEmail, oldPassword, newPassword }: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
        passwordHash: true,
      },
    });
    if (!user) throw new UserNotFoundError(userId);

    if (newUsername) user.username = newUsername;

    if (newEmail) {
      const isEmailAvailable = await this.authService.checkEmailAvailability(newEmail);
      if (!isEmailAvailable) throw new EmailAlreadyExistsError(newEmail);

      user.email = newEmail;
    }

    if (oldPassword && newPassword) {
      const oldPasswordMatches = await this.authService.checkPassword(userId, oldPassword);
      if (!oldPasswordMatches) throw new InvalidPasswordError(oldPassword);

      user.passwordHash = await this.authService.hash(newPassword);
    }

    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...user
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }
}
