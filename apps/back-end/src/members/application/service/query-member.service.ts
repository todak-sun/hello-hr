import { MemberRepository } from "@/members/adapter/out/persistence/member.repository";
import { Injectable } from "@nestjs/common";
import { QueryMemberSchema } from "../port/out/dto/query-member.schema";
import { QueryMemberUseCase } from "../port/out/query-member.usecase";

@Injectable()
export class QueryMemberService implements QueryMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}
  async queryMany(): Promise<QueryMemberSchema[]> {
    return this.memberRepository.queryAll();
  }
}
