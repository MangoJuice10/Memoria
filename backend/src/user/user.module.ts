import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "src/auth/auth.module";
import { StorageModule } from "src/storage/storage.module";

@Module({
  imports: [AuthModule, StorageModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
