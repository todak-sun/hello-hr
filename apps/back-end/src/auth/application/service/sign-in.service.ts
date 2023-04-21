import { SignInUseCase } from "../port/in/sign-in.usecase";

export class SignInService implements SignInUseCase {
  signIn(username: string, password: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
