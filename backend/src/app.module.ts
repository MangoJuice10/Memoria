import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { FlashcardModule } from "./flashcard/flashcard.module";
import { UserModule } from "./user/user.module";
import { ZodFilter } from "src/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { DomainFilter } from "src/common/filters/domain.filter";
import { DeckModule } from "./deck/deck.module";
import { HttpExceptionFilter } from "src/common/filters/http-exception.filter";
import { SuccessResponseInterceptor } from "src/common/interceptors/success-response.interceptor";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    FlashcardModule,
    UserModule,
    DeckModule,
  ],
  providers: [
    SuccessResponseInterceptor,
    {
      provide: APP_INTERCEPTOR,
      useExisting: SuccessResponseInterceptor,
    },
    HttpExceptionFilter,
    {
      provide: APP_FILTER,
      useExisting: HttpExceptionFilter,
    },
    ZodFilter,
    {
      provide: APP_FILTER,
      useExisting: ZodFilter,
    },
    DomainFilter,
    {
      provide: APP_FILTER,
      useExisting: DomainFilter,
    },
  ],
})
export class AppModule {}
