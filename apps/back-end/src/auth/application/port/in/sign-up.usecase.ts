export const SignUpUseCaseSymbol = Symbol("SignUpUseCase");

export interface SignUpUseCase {
  signUp(username: string, password: string): Promise<number>;
}
