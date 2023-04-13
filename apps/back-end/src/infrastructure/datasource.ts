import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export const postgresqlDataSource = async (configService: ConfigService) => {
  const dataSource = new DataSource({
    type: "postgres",
    host: configService.get<string>("POSTGRES_HOST"),
    port: configService.get<number>("POSTGRES_PORT"),
    username: configService.get<string>("POSTGRES_USERNAME"),
    password: configService.get<string>("POSTGRES_PASSWORD"),
  });

  return await dataSource.initialize();
};
