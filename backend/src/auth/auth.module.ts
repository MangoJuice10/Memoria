import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {
  AccessTokenStrategy,
  LocalStrategy,
  RefreshTokenStrategy,
} from "./strategies";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { APP_GUARD } from "@nestjs/core";
import { JwtAccessAuthGuard } from "./guards";
import { LoginValidationMiddleware } from "./middleware/login-validation.middleware";

@Module({
  imports: [JwtModule.register({}), PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAccessAuthGuard,
    },
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes({
      path: "auth/login",
      method: RequestMethod.POST,
    });
  }
}
