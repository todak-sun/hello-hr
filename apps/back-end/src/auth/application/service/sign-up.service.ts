import { SignUpUseCase } from "@/auth/application/port/in/sign-up.usecase";
import { CreateMemberUseCase } from "@/members/application/port/in/create-member.usecase";
import { MemberRole } from "@/members/types/member-role";
export class SignUpService implements SignUpUseCase {
  constructor(private readonly createMemberUseCase: CreateMemberUseCase) {}

 async  signUp(username: string, password: string): Promise<number> {
    const memberId =  await this.createMemberUseCase.create({
      username,
      password,
      MemberRole.MEMBER
    });
  }
}
