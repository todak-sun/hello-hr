import { NestAppTestModule } from "@/configuration/test.config";
import { DataBaseModule } from "@/infrastructure/database.module";
import { MemberRoleEntity } from "@/members/domain/member-role.entity";
import { MemberEntity } from "@/members/domain/member.entity";
import { Test } from "@nestjs/testing";
import { MemberRepository } from "./member.repository";

describe("MemberRepositoryTest", () => {
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [NestAppTestModule, DataBaseModule],
      providers: [MemberRepository],
      exports: [MemberRepository],
    }).compile();
    memberRepository = module.get(MemberRepository);
  });

  it(`findOneById()`, async () => {
    await memberRepository.findOneById(1);
  });

  it(`save`, async () => {
    const member = MemberEntity.create("username@username.com", "password");
    const role = new MemberRoleEntity();
    member.addRole();
    await memberRepository.save();
  });
});
