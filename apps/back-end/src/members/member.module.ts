import { DataBaseModule } from "@/infrastructure/database.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MemberRepository } from "./adapter/out/persistence/member.repository";
import { memberProviders } from "./member.providers";

@Module({
  imports: [ConfigModule, DataBaseModule],
  providers: [MemberRepository, ...memberProviders],
  exports: [...memberProviders],
})
export class MemberModule {}
