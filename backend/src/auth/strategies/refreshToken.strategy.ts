import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { Request } from "express";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/services/auth.service";
import { ConfigService } from "@nestjs/config";
import type { JwtPayload } from "src/auth/types/jwt-payload.type";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractRefreshTokenFromCookie,
      ]),
      secretOrKey: configService.get("JWT_REFRESH_SECRET") as string,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = RefreshTokenStrategy.extractRefreshTokenFromCookie(req);
    if (!refreshToken) throw new UnauthorizedException();

    const isRefreshTokenValid = await this.authService.validateRefreshToken(payload.sub, refreshToken);

    if (!isRefreshTokenValid) throw new UnauthorizedException();

    return { id: payload.sub };
  }

  private static extractRefreshTokenFromCookie(req: Request): string | null {
    return req?.cookies?.refreshToken ?? null;
  }
}
