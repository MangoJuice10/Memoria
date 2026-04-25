import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { RegisterDto } from "../schemas";
import * as argon from "argon2";
import { JwtPayload, Tokens } from "../types";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async register({ email, password }: RegisterDto): Promise<Tokens> {
    const userExists = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) throw new BadRequestException("Credentials taken");

    const hash = await this.hash(password);
    const newUser = await this.prismaService.user.create({
      data: {
        username: "TODO",
        email: email,
        passwordHash: hash,
      },
    });

    return this.issueTokens(newUser.id);
  }

  login(userId: number) {
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

  refresh(userId: number) {
    return this.issueTokens(userId);
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return null;

    const passwordMatches = await this.verifyPassword(user.passwordHash, password);
    if (!passwordMatches) return null;
    return user;
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return false;

    if (!user.refreshTokenHash) return false;

    const refreshTokenMatches = await this.verifyRefreshToken(user.refreshTokenHash, refreshToken);
    if (!refreshTokenMatches) return false;

    return true;
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

  private hash(password: string) {
    return argon.hash(password);
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
