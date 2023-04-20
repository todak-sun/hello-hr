import { DataBaseModule } from "@/infrastructure/database.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BambooRepository } from "./adapter/out/persistence/bamboo.repository";

@Module({
  imports: [ConfigModule, DataBaseModule],
  providers: [BambooRepository],
})
export class BambooForestModule {}
