import { InjectionToken, OnModuleDestroy } from "@nestjs/common";
import { StartedTestContainer } from "testcontainers";

export class TestContainerService implements OnModuleDestroy {
  constructor(private readonly map: Map<InjectionToken, StartedTestContainer> = new Map()) {}

  add(token: InjectionToken, container: StartedTestContainer): TestContainerService {
    this.map.set(token, container);
    return this;
  }

  get<T>(token: InjectionToken): T {
    const founded = this.map.get(token);
    if (!founded) {
      throw new Error(`NotFound Token = ${String(token)}`);
    }
    return founded as T;
  }

  async closeAll() {
    await Promise.all(
      [...this.map.values()].map(async (container) => {
        return await container.stop();
      }),
    );
  }

  async onModuleDestroy() {
    await this.closeAll();
  }
}
