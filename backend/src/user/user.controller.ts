import { Controller, Get, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/decorators/user.decorator";
import { UserService } from "src/user/user.service";
import { UserResponseDto } from "src/user/dto/user-response.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  async getMe(@User("id") userId: number): Promise<UserResponseDto> {
    const user = await this.userService.getCurrentUser(userId);
    if (!user) throw new NotFoundException("User not found");

    return user;
  }
}
