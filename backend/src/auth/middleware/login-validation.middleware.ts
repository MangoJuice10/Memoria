import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../schemas";

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    req.body = loginSchema.parse(req.body);
    next();
  }
}
