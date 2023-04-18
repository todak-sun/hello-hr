import { dataSourceProviders } from "@/infrastructure/datasource.providers";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: dataSourceProviders,
  exports: dataSourceProviders,
})
export class DataBaseModule {}
