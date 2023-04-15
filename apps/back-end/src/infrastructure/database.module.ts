import { PgDataSource, PgDataSourceSymbol } from "@/infrastructure/datasource";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PgDataSourceSymbol,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return await PgDataSource(configService);
      },
    },
  ],
  exports: [PgDataSourceSymbol],
})
export class DataBaseModule {}
