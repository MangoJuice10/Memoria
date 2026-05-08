import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthenticatedUser } from "src/auth/types";
import { FlashcardService } from "src/flashcard/flashcard.service";

type FlashcardRequest = {
  params: {
    deckId: string;
    flashcardId: string;
  };
  user: AuthenticatedUser;
};

@Injectable()
export class FlashcardOwnershipGuard implements CanActivate {
  constructor(private readonly flashcardService: FlashcardService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<FlashcardRequest>();

    await this.flashcardService.assertOwnership(
      Number(request.params.deckId),
      Number(request.params.flashcardId),
    );

    return true;
  }
}
