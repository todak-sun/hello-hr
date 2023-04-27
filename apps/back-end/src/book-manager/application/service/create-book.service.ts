import { BookRepository } from "../../adapter/out/book.repository";
import { BookEntity } from "../../domain/book.entity";
import { CreateBookUseCase } from "../port/in/create-book.usecase";

export class CreateBookService implements CreateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async create(isbn: string, title: string): Promise<number> {
    const founded = await this.bookRepository.findOneBy({ isbn });
    if (founded) {
      throw new Error("이미 등록된 책입니다.");
    }
    const book = BookEntity.create(isbn, title);
    const newBook = await this.bookRepository.save(book);
    return newBook.id;
  }
}
