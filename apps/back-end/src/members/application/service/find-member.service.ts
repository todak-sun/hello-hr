import { MemberRepository } from "@/members/adapter/out/persistence/member.repository";
import { MemberEntity } from "@/members/domain/member.entity";
import { Injectable } from "@nestjs/common";
import { FindMemberUseCase } from "../port/in/find-member.usecase";

@Injectable()
export class FindMemberService implements FindMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}
  findByUsername(username: string): Promise<MemberEntity | null> {
    return this.memberRepository.findOneByUsername(username);
  }
}
