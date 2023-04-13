import { LocalDateTime } from "@js-joda/core";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BambooEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  password: string;

  @Column()
  createdDateTime: LocalDateTime;

  static create(content: string, password: string): BambooEntity {
    const bamboo = new BambooEntity();
    bamboo.content = content;
    bamboo.password = password;
    bamboo.createdDateTime = LocalDateTime.now();
    return bamboo;
  }
}
