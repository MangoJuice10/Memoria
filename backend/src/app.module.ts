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
import { ReviewModule } from './review/review.module';
import { Sm2Service } from 'src/review/services/sm2.service';
import { StorageModule } from './storage/storage.module';
import { EducationalResourceModule } from './educational-resource/educational-resource.module';

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
    ReviewModule,
    StorageModule,
    EducationalResourceModule,
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
    Sm2Service,
  ],
})
export class AppModule {}
