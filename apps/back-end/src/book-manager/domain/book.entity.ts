import { LocalDateTime } from "@js-joda/core";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LocalDateTimeTransformer } from "../../common/local-date-time.transformer";

@Entity({
  name: "book",
})
export class BookEntity {
  @PrimaryGeneratedColumn({ name: "book_id" })
  id: number;

  @Column({ name: "isbn", unique: true })
  isbn: string;

  @Column({ name: "title" })
  title: string;

  @Column({ name: "updated_datetime", transformer: new LocalDateTimeTransformer() })
  updatedDateTime: LocalDateTime;

  @Column({ name: "created_datetime", transformer: new LocalDateTimeTransformer() })
  createdDateTime: LocalDateTime;

  static create(isbn: string, title: string): BookEntity {
    const book = new BookEntity();
    book.isbn = isbn;
    book.title = title;
    book.updatedDateTime = LocalDateTime.now();
    book.createdDateTime = LocalDateTime.now();
    return book;
  }
}
