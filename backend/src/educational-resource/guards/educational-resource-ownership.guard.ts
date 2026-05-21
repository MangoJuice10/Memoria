import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { EducationalResourceService } from "src/educational-resource/educational-resource.service";
import { AuthenticatedUser } from "src/auth/types";

export type EducationalResourceRequest = {
  params: {
    educationalResourceId: string;
  };
  user: AuthenticatedUser;
};

@Injectable()
export class EducationalResourceOwnershipGuard implements CanActivate {
  constructor(private readonly educationalResourceService: EducationalResourceService) {}

  async canActivate(context: ExecutionContext) {
    const {
      user: { id: userId },
      params: { educationalResourceId },
    } = context.switchToHttp().getRequest<EducationalResourceRequest>();
    await this.educationalResourceService.assertOwnership(userId, Number(educationalResourceId));

    return true;
  }
}
