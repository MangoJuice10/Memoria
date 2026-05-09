import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";

@Injectable()
export class DeckValidationMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const deckId = Number(req.params.deckId);

    if (!Number.isInteger(deckId))
      throw new BadRequestException("The deckId route parameter must be an integer");
    next();
  }
}
