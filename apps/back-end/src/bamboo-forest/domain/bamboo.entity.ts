import { LocalDateTimeTransformer } from "@/common/local-date-time.transformer";
import { LocalDateTime } from "@js-joda/core";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "bamboo" })
export class BambooEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    type: "timestamptz",
    transformer: new LocalDateTimeTransformer(),
    nullable: false,
  })
  createdDateTime: LocalDateTime;

  static create(title: string, content: string, password: string): BambooEntity {
    const bamboo = new BambooEntity();
    bamboo.title = title;
    bamboo.content = content;
    bamboo.password = password;
    bamboo.createdDateTime = LocalDateTime.now();
    return bamboo;
  }
}
