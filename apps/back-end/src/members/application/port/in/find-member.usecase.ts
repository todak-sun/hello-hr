import { MemberEntity } from "@/members/domain/member.entity";

export const FindMemberUseCaseSymbol = Symbol("FindMemberUseCase");

export interface FindMemberUseCase {
  findByUsername(username: string): Promise<MemberEntity | null>;
}
