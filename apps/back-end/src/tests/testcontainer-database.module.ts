import { PgDataSourceSymbol } from "@/infrastructure/datasource.providers";
import { DynamicModule, Module } from "@nestjs/common";
import { StartedPostgreSqlContainer } from "testcontainers";
import { DataSource, DataSourceOptions, EntitySchema, MixedList } from "typeorm";
import { TestContainerModule } from "./testcontainer.module";
import { TestContainerService } from "./testcontainer.service";

@Module({ imports: [TestContainerModule] })
export class TestContainerDatabaseModule {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static forEntities(entities: MixedList<Function | string | EntitySchema>): DynamicModule {
    const providers = [
      {
        provide: PgDataSourceSymbol,
        inject: [TestContainerService],
        useFactory: async (testContainerService: TestContainerService) => {
          const container = testContainerService.get<StartedPostgreSqlContainer>(StartedPostgreSqlContainer);

          const dataSourceOptions: DataSourceOptions = {
            type: "postgres",
            host: container.getHost(),
            port: container.getPort(),
            database: container.getDatabase(),
            username: container.getUsername(),
            password: container.getPassword(),
            entities,
            synchronize: true,
            logging: ["query", "schema", "error"],
          };

          const dataSource = new DataSource(dataSourceOptions);
          return await dataSource.initialize();
        },
      },
    ];
    return {
      module: TestContainerDatabaseModule,
      providers,
      exports: providers,
    };
  }
}
