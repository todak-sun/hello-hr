import { MemberRoleEntity } from "@/members/domain/member-role.entity";
import { MemberEntity } from "@/members/domain/member.entity";
import { TestContainerDatabaseModule } from "@/tests/testcontainer-database.module";
import { Test, TestingModule } from "@nestjs/testing";
import { MemberRepository } from "./member.repository";

describe("MemberRepositoryTest", () => {
  let memberRepository: MemberRepository;
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TestContainerDatabaseModule.forEntities([MemberEntity, MemberRoleEntity])],
      providers: [MemberRepository],
      exports: [MemberRepository],
    }).compile();
    memberRepository = module.get(MemberRepository);
  });

  afterAll(async () => {
    await module.close();
  });

  it(`findOneById()`, async () => {
    await memberRepository.findOneById(1);
  });

  it(`save`, async () => {
    const member = MemberEntity.create("username@username.com", "password");
    const role = MemberRoleEntity.create("admin");
    member.addRole(role);
    await memberRepository.save(member);
  });
});
