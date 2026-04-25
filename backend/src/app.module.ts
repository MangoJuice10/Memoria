import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { FlashcardModule } from "./flashcard/flashcard.module";
import { UserModule } from "./user/user.module";
import { ZodFilter } from "src/common";
import { APP_FILTER } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    FlashcardModule,
    UserModule,
  ],
  providers: [
    ZodFilter,
    {
      provide: APP_FILTER,
      useExisting: ZodFilter,
    },
  ],
})
export class AppModule {}
