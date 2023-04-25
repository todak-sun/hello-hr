import { LocalDate, LocalDateTime } from "@js-joda/core";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LocalDateTimeTransformer } from "../../common/local-date-time.transformer";
import { LocalDateTransformer } from "../../common/local-date.transformer";

@Entity({
  name: "book_checkout",
})
export class BookCheckoutEntity {
  @PrimaryGeneratedColumn({ name: "book_checkout_id" })
  id: number;

  @Column({ name: "member_id" })
  memberId: number;

  @Column({ name: "book_item_id", nullable: true })
  bookItemId: number;

  @Column({ name: "checked_out_datetime", transformer: new LocalDateTimeTransformer() })
  checkedOutDateTime: LocalDateTime;

  @Column({ name: "return_date", transformer: new LocalDateTransformer() })
  returnDate: LocalDate;

  @Column({ name: "returned_datetime", transformer: new LocalDateTimeTransformer() })
  returnedDateTime: LocalDateTime;
}
