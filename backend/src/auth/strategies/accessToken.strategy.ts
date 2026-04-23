import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "src/auth/types/jwt-payload.type";
import type { AuthenticatedUser } from "../types";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-access",
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_ACCESS_SECRET") as string,
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser {
    return { id: payload.sub };
  }
}
