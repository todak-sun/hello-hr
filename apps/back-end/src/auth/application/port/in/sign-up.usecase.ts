export interface SignUpUseCase {
  signUp(username: string, password: string): Promise<number>;
}
