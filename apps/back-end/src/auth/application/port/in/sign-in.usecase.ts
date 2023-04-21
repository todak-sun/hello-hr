export interface SignInUseCase {
  signIn(username: string, password: string): Promise<string>;
}
