export interface CreateBookUseCase {
  create(isbn: string, title: string): number | Promise<number>;
}
