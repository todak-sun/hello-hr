import { BambooRepository } from "@/bamboo-forest/adapter/out/bamboo.repository";
import { NestAppTestModule } from "@/configuration/test.config";
import { DataBaseModule } from "@/infrastructure/database.module";
import { Test } from "@nestjs/testing";
import { CreateBambooUseCase } from "../port/in/create-bamboo.use-case";
import { CreateBambooService } from "./create-bamboo.service";

describe("CreateBambooService Test", () => {
  let repository: BambooRepository;
  let createBambooUseCase: CreateBambooUseCase;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [NestAppTestModule, DataBaseModule],
      providers: [BambooRepository, CreateBambooService],
      exports: [BambooRepository, CreateBambooService],
    }).compile();
    repository = module.get(BambooRepository);
    createBambooUseCase = module.get(CreateBambooService);
  });

  afterAll(async () => {
    await repository.clear();
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
