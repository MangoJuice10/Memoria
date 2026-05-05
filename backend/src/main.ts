import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cookieParser from "cookie-parser";
import { z } from "zod";
import { errorMap } from "src/common/errors";

async function bootstrap() {
  configureZod();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
  });
  app.use(cookieParser(process.env.COOKIE_SECRET));
  await app.listen(process.env.PORT ?? 3000);
}

function configureZod() {
  z.config({
    customError: errorMap,
  });
}

void bootstrap();
