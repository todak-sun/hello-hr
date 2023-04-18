import { BambooRepository } from "@/bamboo-forest/adapter/out/persistence/bamboo.repository";
import { BambooEntity } from "@/bamboo-forest/domain/bamboo.entity";
import { TestContainerDatabaseModule } from "@/tests/testcontainer-database.module";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateBambooUseCase } from "../port/in/create-bamboo.use-case";
import { CreateBambooService } from "./create-bamboo.service";

describe("CreateBambooService Test", () => {
  let repository: BambooRepository;
  let createBambooUseCase: CreateBambooUseCase;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TestContainerDatabaseModule.forEntities([BambooEntity])],
      providers: [BambooRepository, CreateBambooService],
      exports: [BambooRepository, CreateBambooService],
    }).compile();
    repository = module.get(BambooRepository);
    createBambooUseCase = module.get(CreateBambooService);
  });

  afterAll(async () => {
    await repository.clear();
    await module.close();
  });

  it("Service is defined", async () => {
    // given
    const title = "대나무 숲";
    const content = "임금님 귀는 당나귀 귀~~";
    const password = "bimil~~";

    // when
    const id = await createBambooUseCase.create(title, content, password);

    // then
    expect(id).toBeDefined();
    const bamboo = await repository.findOneByOrFail({ id: id });
    expect(bamboo).toBeDefined();
    expect(bamboo.title).toBe(title);
    expect(bamboo.content).toBe(content);
    expect(bamboo.password).toBeDefined();
    expect(bamboo.password).not.toBe(password);
  });
});
