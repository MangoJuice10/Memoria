import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard("jwt-access") {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    return super.canActivate(context);
  }
}