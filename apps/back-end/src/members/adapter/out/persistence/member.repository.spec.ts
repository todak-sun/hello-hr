import { MemberRoleEntity } from "@/members/domain/member-role.entity";
import { MemberEntity } from "@/members/domain/member.entity";
import { MemberRole } from "@/members/types/member-role";
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
    const member = await MemberEntity.create("username@username.com", "password");
    const role = MemberRoleEntity.create(MemberRole.SUPER);
    member.addRole(role);
    await memberRepository.save(member);
  });

  it(`queryAll`, async () => {
    // given
    const members = await Promise.all(
      new Array(100).fill(1).map(async (item, index) => {
        const member = await MemberEntity.create(`username${index}@username.com`, `password${index}`);
        member.addRole(MemberRoleEntity.create(MemberRole.MEMBER));
        member.addRole(MemberRoleEntity.create(MemberRole.SUPER));
        return member;
      }),
    );

    await memberRepository.save(members);

    // when
    const results = await memberRepository.queryAll();

    console.log(results[0]);

    // then
    expect(results.length).toBe(100);
  });
});
