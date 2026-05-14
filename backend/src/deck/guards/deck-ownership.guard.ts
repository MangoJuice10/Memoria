import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { DeckService } from "src/deck/deck.service";
import { AuthenticatedUser } from "src/auth/types";

type DeckRequest = {
  params: {
    deckId: string;
  };
  user: AuthenticatedUser;
};

@Injectable()
export class DeckOwnershipGuard implements CanActivate {
  constructor(private readonly deckService: DeckService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<DeckRequest>();
    await this.deckService.assertOwnership(request.user.id, Number(request.params.deckId));

    return true;
  }
}
