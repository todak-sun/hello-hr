import { TestContainerDatabaseModule } from "@/tests/testcontainer-database.module";
import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { MemberRepository } from "./adapter/out/persistence/member.repository";
import { FindMemberUseCase, FindMemberUseCaseSymbol } from "./application/port/in/find-member.usecase";
import { MemberRoleEntity } from "./domain/member-role.entity";
import { MemberEntity } from "./domain/member.entity";
import { memberProviders } from "./member.providers";

describe("member module test", () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ".env",
        }),
        TestContainerDatabaseModule.forEntities([MemberEntity, MemberRoleEntity]),
      ],
      providers: [MemberRepository, ...memberProviders],
      exports: [...memberProviders],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it(`module exports test`, async () => {
    const findMemberUseCase = module.get<FindMemberUseCase>(FindMemberUseCaseSymbol);
    expect(findMemberUseCase).toBeDefined();

    await findMemberUseCase.findByUsername("tester@tester.com");
  });
});
