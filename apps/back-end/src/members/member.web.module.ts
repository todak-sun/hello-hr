import { Module } from "@nestjs/common";
import { MemberController } from "./adapter/in/web/member.controller";
import { MemberModule } from "./member.module";

@Module({
  imports: [MemberModule],
  controllers: [MemberController],
})
export class MemberWebModule {}
