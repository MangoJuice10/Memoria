import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import type { Request, Response, NextFunction } from "express";

@Injectable()
export class FlashcardValidationMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const deckId = Number(req.params.deckId);
    const flashcardId = Number(req.params.flashcardId);

    if (!Number.isInteger(deckId)) throw new BadRequestException("The deckId must be an integer");
    if (!Number.isInteger(flashcardId))
      throw new BadRequestException("The flashcardId must be an integer");
    next();
  }
}
