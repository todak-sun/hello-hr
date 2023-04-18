import { BambooEntity } from "@/bamboo-forest/domain/bamboo.entity";
import { MemberRoleEntity } from "@/members/domain/member-role.entity";
import { MemberEntity } from "@/members/domain/member.entity";
import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export const PgDataSourceSymbol = Symbol("PgDataSource");

export const dataSourceProviders: Provider[] = [
  {
    provide: PgDataSourceSymbol,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
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
        entities: [BambooEntity, MemberEntity, MemberRoleEntity],
      });
      return await dataSource.initialize();
    },
  },
];
