import { generateHashedValue } from "@/common/bcrypt.util";
import { MemberRepository } from "@/members/adapter/out/persistence/member.repository";
import { CreateMemberUseCase } from "@/members/application/port/in/create-member.usecase";
import { CreateMemberCommand } from "@/members/application/port/in/dto/create-member.command";
import { MemberEntity } from "@/members/domain/member.entity";

export class CreateMemberService implements CreateMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async create(command: CreateMemberCommand): Promise<number> {
    const hashedPassword = await generateHashedValue(command.password);
    const member = MemberEntity.create(command.username, hashedPassword);
    const saved = await this.memberRepository.save(member);
    return saved.id;
  }
}
