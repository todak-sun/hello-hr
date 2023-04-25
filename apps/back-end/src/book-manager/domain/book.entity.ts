import { LocalDateTime } from "@js-joda/core";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LocalDateTimeTransformer } from "../../common/local-date-time.transformer";

@Entity({
  name: "book",
})
export class BookEntity {
  @PrimaryGeneratedColumn({ name: "book_id" })
  id: number;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "isbn" })
  isbn: string;

  @Column({ name: "updated_datetime", transformer: new LocalDateTimeTransformer() })
  updatedDateTime: LocalDateTime;

  @Column({ name: "created_datetime", transformer: new LocalDateTimeTransformer() })
  createdDateTime: LocalDateTime;
}
