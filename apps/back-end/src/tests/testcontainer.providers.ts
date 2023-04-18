import { Provider } from "@nestjs/common";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "testcontainers";
import { TestContainerService } from "./testcontainer.service";

export const testContainerProviders: Provider[] = [
  {
    provide: TestContainerService,
    useFactory: async () => {
      const container = await new PostgreSqlContainer("postgres:15.2")
        .withExposedPorts(5432)
        .withDatabase("test-db")
        .withUsername("todak-sun")
        .withPassword("pas@!sw#or42314d@")
        .start();
      return new TestContainerService().add(StartedPostgreSqlContainer, container);
    },
  },
];
