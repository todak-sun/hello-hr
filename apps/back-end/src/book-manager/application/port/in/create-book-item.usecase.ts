export interface CreateBookItemUseCase {
  create(): number | Promise<number>;
}
