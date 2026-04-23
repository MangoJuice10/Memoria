import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ZodValidationPipe } from "src/common";
import { AuthService } from "../services/auth.service";
import { JwtRefreshAuthGuard, LocalAuthGuard } from "../guards";
import { RegisterDto, registerSchema } from "../schemas";
import type { Response } from "express";
import { Public } from "../decorators";
import type { AccessTokenResponseDto } from "../dto/access-token-response.dto";
import { getRefreshTokenCookieOptions, REFRESH_TOKEN_COOKIE_NAME } from "../constants";
import { User } from "../decorators/user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponseDto> {
    const { accessToken, refreshToken } = await this.authService.register(registerDto);
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, getRefreshTokenCookieOptions());
    return { accessToken };
  }

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(
    @User("id") userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponseDto> {
    const { accessToken, refreshToken } = await this.authService.login(userId);
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, getRefreshTokenCookieOptions());
    return { accessToken };
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@User("id") userId: number, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(userId);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, getRefreshTokenCookieOptions());
  }

  @Public()
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(
    @User("id") userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponseDto> {
    const { accessToken, refreshToken } = await this.authService.refresh(userId);
    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, getRefreshTokenCookieOptions());
    return { accessToken };
  }
}