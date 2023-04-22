import { SignUpUseCase } from "@/auth/application/port/in/sign-up.usecase";
import { CreateMemberUseCase, CreateMemberUseCaseSymbol } from "@/members/application/port/in/create-member.usecase";
import { MemberRole } from "@/members/types/member-role";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class SignUpService implements SignUpUseCase {
  constructor(@Inject(CreateMemberUseCaseSymbol) private readonly createMemberUseCase: CreateMemberUseCase) {}

  async signUp(username: string, password: string): Promise<number> {
    const memberId = await this.createMemberUseCase.create({
      username,
      password,
      role: MemberRole.MEMBER,
    });
    return memberId;
  }
}
