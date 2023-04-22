import { Token } from "./dto/token";

export const SignInUseCaseSymbol = Symbol("SignInUseCase");
export interface SignInUseCase {
  signIn(username: string, password: string): Promise<Token>;
}
