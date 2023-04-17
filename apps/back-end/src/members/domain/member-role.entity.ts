import { LocalDateTimeTransformer } from "@/common/local-date-time.transformer";
import { LocalDateTime } from "@js-joda/core";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { MemberEntity } from "./member.entity";

@Entity({ name: "member_role" })
export class MemberRoleEntity {
  @PrimaryColumn({ name: "member_role_id" })
  id: number;

  @Column({ nullable: false, name: "role" })
  role: string;

  @ManyToOne(() => MemberEntity, (member) => member.roles)
  member: MemberEntity;

  @Column({
    name: "created_datetime",
    transformer: new LocalDateTimeTransformer(),
    nullable: false,
    type: "timestamptz",
  })
  createdDateTime: LocalDateTime;
}
