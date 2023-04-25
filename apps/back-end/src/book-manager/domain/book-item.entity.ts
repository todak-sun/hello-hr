import { LocalDateTime } from "@js-joda/core";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LocalDateTimeTransformer } from "../../common/local-date-time.transformer";

@Entity({
  name: "book_item",
})
export class BookItemEntity {
  @PrimaryGeneratedColumn({ name: "book_item_id" })
  id: number;

  @Column({ name: "book_id" })
  bookId: number;

  @Column({ name: "check_out_user_id", nullable: true })
  checkoutUserId: number;

  @Column({ name: "created_datetime", transformer: new LocalDateTimeTransformer() })
  createdDateTime: LocalDateTime;

  @Column({ name: "updated_datetime", transformer: new LocalDateTimeTransformer() })
  updatedDateTime: LocalDateTime;
}
