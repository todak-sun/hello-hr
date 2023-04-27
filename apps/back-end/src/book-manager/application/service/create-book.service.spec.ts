import { FindOptionsWhere } from "typeorm";
import { BookRepository } from "../../adapter/out/book.repository";
import { BookEntity } from "../../domain/book.entity";
import { CreateBookService } from "./create-book.service";

jest.mock("../../adapter/out/book.repository");
describe("CreateBookService Test", () => {
  it("중복된 ISBN이 있는 경우, 실패", async () => {
    // given
    const repository: BookRepository = {
      async findOneBy(option: FindOptionsWhere<BookEntity>) {
        return BookEntity.create(option.isbn as string, "title");
      },
    } as BookRepository;

    // when
    const service: CreateBookService = new CreateBookService(repository);

    // then
    await expect(async () => {
      await service.create("ISBN", "TITLE");
    }).rejects.toThrow();
  });
});
