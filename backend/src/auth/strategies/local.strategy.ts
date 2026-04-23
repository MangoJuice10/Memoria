import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/services/auth.service";
import type { AuthenticatedUser } from "src/auth/types";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email" });
  }

  async validate(username: string, password: string): Promise<AuthenticatedUser> {
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException("Invalid credentials");
    return { id: user.id };
  }
}
