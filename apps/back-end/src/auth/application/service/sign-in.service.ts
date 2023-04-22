import { FindMemberUseCase, FindMemberUseCaseSymbol } from "@/members/application/port/in/find-member.usecase";
import { Inject, Injectable } from "@nestjs/common";

import { Token } from "@/auth/application/port/in/dto/token";
import { SignInUseCase } from "@/auth/application/port/in/sign-in.usecase";
import { JWTService } from "@/auth/application/service/jwt.service";

@Injectable()
export class SignInService implements SignInUseCase {
  constructor(
    private readonly jwtService: JWTService,
    @Inject(FindMemberUseCaseSymbol) private readonly findMemberUseCase: FindMemberUseCase,
  ) {}
  async signIn(username: string, password: string): Promise<Token> {
    const member = await this.findMemberUseCase.findByUsername(username);
    if (!member) {
      throw new Error("존재하지 않는 계정이거나, 비밀번호가 다릅니다.");
    }

    const isSamePassword = await member.isSamePassword(password);
    if (!isSamePassword) {
      throw new Error("존재하지 않는 계정이거나, 비밀번호가 다릅니다.");
    }

    const memberPayload = {
      id: member.id,
      username: member.username,
      roles: member.getRoles(),
    };

    const token = this.jwtService.signToken(memberPayload);

    return { accessToken: token };
  }
}
