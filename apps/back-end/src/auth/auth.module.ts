import { MemberModule } from "@/members/member.module";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JWTService } from "./application/service/jwt.service";
import { authProviders } from "./auth.providers";

@Module({
  imports: [ConfigModule, MemberModule],
  providers: [
    {
      provide: JWTService,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new JWTService(configService.get("KEY_DIRECTORY_PATH")!);
      },
    },
    ...authProviders,
  ],
  exports: [...authProviders],
})
export class AuthModule {}
