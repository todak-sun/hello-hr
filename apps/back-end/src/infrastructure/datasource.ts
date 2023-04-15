import { BambooEntity } from "@/bamboo-forest/domain/bamboo.entity";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export const PgDataSourceSymbol = Symbol("PgDataSource");

export const PgDataSource = async (configService: ConfigService) => {
  const synchronize = configService.get<string>("NODE_ENV") !== "production";
  const dataSource = new DataSource({
    type: "postgres",
    host: configService.get<string>("POSTGRES_HOST"),
    port: configService.get<number>("POSTGRES_PORT"),
    username: configService.get<string>("POSTGRES_USERNAME"),
    password: configService.get<string>("POSTGRES_PASSWORD"),
    database: configService.get<string>("POSTGRES_DATABASE"),
    logging: ["query", "error", "schema"],
    synchronize,
    entities: [BambooEntity],
  });

  return await dataSource.initialize();
};
