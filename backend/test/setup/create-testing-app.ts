import { INestApplication } from "@nestjs/common";
import { Test, TestingModuleBuilder } from "@nestjs/testing";
import cookieParser from "cookie-parser";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";
import { VectorStoreService } from "src/vector-store/vector-store.service";
import { StorageService } from "src/storage/storage.service";

export type TestingApp = {
  app: INestApplication;
  prismaService: PrismaService;
  vectorStoreService: VectorStoreService;
  storageService: StorageService;
  httpServer: ReturnType<INestApplication["getHttpServer"]>;
};

export async function createTestingApp(
  overrides?: (testingAppBuilder: TestingModuleBuilder) => TestingModuleBuilder,
): Promise<TestingApp> {
  let testingAppBuilder = Test.createTestingModule({
    imports: [AppModule],
  });

  if (overrides) testingAppBuilder = overrides(testingAppBuilder);

  const moduleRef = await testingAppBuilder.compile();

  const app = moduleRef.createNestApplication();
  app.use(cookieParser(process.env.COOKIE_SECRET));

  await app.init();

  const httpServer = app.getHttpServer();
  const prismaService = app.get(PrismaService);
  const vectorStoreService = app.get(VectorStoreService);
  const storageService = app.get(StorageService);

  return {
    app,
    prismaService,
    vectorStoreService,
    storageService,
    httpServer,
  };
}
