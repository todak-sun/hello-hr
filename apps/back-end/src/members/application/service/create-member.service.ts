import { MemberRepository } from "@/members/adapter/out/persistence/member.repository";
import { CreateMemberUseCase } from "@/members/application/port/in/create-member.usecase";
import { CreateMemberCommand } from "@/members/application/port/in/dto/create-member.command";
import { MemberRoleEntity } from "@/members/domain/member-role.entity";
import { MemberEntity } from "@/members/domain/member.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateMemberService implements CreateMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async create(command: CreateMemberCommand): Promise<number> {
    const founded = await this.memberRepository.findOneBy({ username: command.username });
    if (founded) {
      throw new Error("중복된 아이디가 존재합니다.");
    }

    const member = await MemberEntity.create(command.username, command.password);
    member.addRole(MemberRoleEntity.create(command.role));

    const saved = await this.memberRepository.save(member);

    return saved.id;
  }
}
