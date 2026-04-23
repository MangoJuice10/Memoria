import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(configService: ConfigService) {
    const adapter = new PrismaPg({
      connectionString: configService.get("DATABASE_URL"),
    });
    super({ adapter });
  }

  onModuleInit() {
    this.$connect();
  }

  onModuleDestroy() {
    this.$disconnect();
  }
}
