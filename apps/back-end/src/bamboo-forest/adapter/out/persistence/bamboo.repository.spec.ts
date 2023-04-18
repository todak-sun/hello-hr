import { BambooEntity } from "@/bamboo-forest/domain/bamboo.entity";
import { TestContainerDatabaseModule } from "@/tests/testcontainer-database.module";
import { Test, TestingModule } from "@nestjs/testing";
import { BambooRepository } from "./bamboo.repository";

describe("BambooRepository Test", () => {
  let module: TestingModule;
  let repository: BambooRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TestContainerDatabaseModule.forEntities([BambooEntity])],
      providers: [BambooRepository],
      exports: [BambooRepository],
    }).compile();
    repository = module.get(BambooRepository);
  });

  afterAll(async () => {
    await module.close();
  });

  it("repository defined", async () => {
    expect(repository).toBeDefined();
  });
});
