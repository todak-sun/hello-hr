import { AuthWebModule } from "@/auth/auth.web.module";
import { MemberWebModule } from "@/members/member.web.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
    }),
    AuthWebModule,
    MemberWebModule,
  ],
})
export class AppModule {}
