export interface CreateBambooUseCase {
  create(content: string, password: string): number | Promise<number>;
}
