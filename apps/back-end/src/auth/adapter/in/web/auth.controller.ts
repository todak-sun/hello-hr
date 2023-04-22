import { SignInUseCase, SignInUseCaseSymbol } from "@/auth/application/port/in/sign-in.usecase";
import { SignUpUseCase, SignUpUseCaseSymbol } from "@/auth/application/port/in/sign-up.usecase";
import { ResOne } from "@hello-hr/interfaces/response";
import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";

@Controller({
  path: "/auth",
})
export class AuthController {
  constructor(
    @Inject(SignInUseCaseSymbol) private readonly signInUseCase: SignInUseCase,
    @Inject(SignUpUseCaseSymbol) private readonly signUpUseCase: SignUpUseCase,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("/sign-up")
  async signUp(@Body() request: { username: string; password: string }) {
    const memberId = await await this.signUpUseCase.signUp(request.username, request.password);
    const response: ResOne<string> = {
      content: "OK",
      meta: {
        apiVersion: "v1",
      },
    };
    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Post("/sign-in")
  async signIn(@Body() request: { username: string; password: string }) {
    const token = await this.signInUseCase.signIn(request.username, request.password);
    const response: ResOne<{ accessToken: string }> = {
      content: { accessToken: token.accessToken },
      meta: {
        apiVersion: "v1",
      },
    };
    return response;
  }
}
