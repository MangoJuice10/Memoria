import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import cookieParser from "cookie-parser";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";

export type TestingApp = {
  app: INestApplication;
  prismaService: PrismaService;
  httpServer: ReturnType<INestApplication["getHttpServer"]>;
};

export async function createTestingApp(): Promise<TestingApp> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.use(cookieParser(process.env.COOKIE_SECRET));

  await app.init();

  const httpServer = app.getHttpServer();
  const prismaService = app.get(PrismaService);

  return {
    app,
    prismaService,
    httpServer,
  };
}
