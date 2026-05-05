import { Body, Controller, Get, Patch } from "@nestjs/common";
import { User } from "src/auth/decorators";
import { UserService } from "src/user/user.service";
import { type UserResponseDto } from "src/user/dto";
import { updateUserSchema, type UpdateUserDto } from "src/user/schemas";
import { ZodValidationPipe } from "src/common";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  async getMe(@User("id") userId: number): Promise<UserResponseDto> {
    return await this.userService.getCurrentUser(userId);
  }

  @Patch("me")
  async updateMe(
    @User("id") userId: number,
    @Body(new ZodValidationPipe(updateUserSchema)) updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateCurrentUser(userId, updateUserDto);
  }
}
