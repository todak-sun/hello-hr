export interface CreateBambooUseCase {
  create(title: string, content: string, password: string): number | Promise<number>;
}
