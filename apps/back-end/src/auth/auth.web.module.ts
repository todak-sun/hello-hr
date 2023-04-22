import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthController } from "./adapter/in/web/auth.controller";
import { AuthModule } from "./auth.module";

@Module({
  imports: [ConfigModule, AuthModule],
  controllers: [AuthController],
})
export class AuthWebModule {}
