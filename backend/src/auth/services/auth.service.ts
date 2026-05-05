import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { RegisterDto } from "../schemas";
import { JwtPayload, Tokens } from "../types";
import { EmailAlreadyExistsError } from "src/user/errors";
import { userInputErrorCodes } from "src/common/constants";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async register({ username, email, password }: RegisterDto): Promise<Tokens> {
    const isEmailAvailable = await this.checkEmailAvailability(email);
    if (!isEmailAvailable)
      throw new EmailAlreadyExistsError([
        {
          path: "email",
          code: userInputErrorCodes.EMAIL_ALREADY_EXISTS,
          message: "Email already exists",
        },
      ]);

    const newUser = await this.createUser(username, email, password);

    return this.issueTokens(newUser.id);
  }

  async login(userId: number) {
    return this.issueTokens(userId);
  }

  async logout(userId: number) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: null,
      },
    });
  }

  async refresh(userId: number) {
    return this.issueTokens(userId);
  }

  async createUser(username: string, email: string, password: string) {
    const hash = await this.hash(password);
    return this.prismaService.user.create({
      data: {
        username: username,
        email: email,
        passwordHash: hash,
      },
    });
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const refreshTokenHash = await this.hash(refreshToken);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash,
      },
    });
  }

  async checkEmailAvailability(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    return !user;
  }

  async checkPassword(id: number, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        passwordHash: true,
      },
    });
    if (!user) return false;

    return this.verifyPassword(user.passwordHash, password);
  }

  async checkRefreshToken(userId: number, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return false;

    if (!user.refreshTokenHash) return false;

    return this.verifyRefreshToken(user.refreshTokenHash, refreshToken);
  }

  async verifyCredentials(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return null;
    const passwordsMatch = await this.verifyPassword(user.passwordHash, password);
    if (!passwordsMatch) return null;
    return user;
  }

  hash(password: string) {
    return argon.hash(password);
  }

  private async issueTokens(userId: number): Promise<Tokens> {
    const tokens = await this.signTokens(userId);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  private async signTokens(userId: number): Promise<Tokens> {
    const payload: JwtPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get("JWT_ACCESS_SECRET"),
        expiresIn: "15m",
      }),
      this.jwtService.signAsync<JwtPayload>(payload, {
        secret: this.configService.get("JWT_REFRESH_SECRET"),
        expiresIn: "7d",
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async verifyPassword(passwordHash: string, password: string) {
    try {
      return await argon.verify(passwordHash, password);
    } catch {
      return false;
    }
  }

  private async verifyRefreshToken(refreshTokenHash: string, refreshToken: string) {
    try {
      return await argon.verify(refreshTokenHash, refreshToken);
    } catch {
      return false;
    }
  }
}
