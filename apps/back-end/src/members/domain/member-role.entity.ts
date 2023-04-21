import { LocalDateTimeTransformer } from "@/common/local-date-time.transformer";
import { LocalDateTime } from "@js-joda/core";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MemberRole } from "../types/member-role";
import { MemberEntity } from "./member.entity";

@Entity({ name: "member_role" })
export class MemberRoleEntity {
  @PrimaryGeneratedColumn({ name: "member_role_id" })
  id: number;

  @Column({ nullable: false, name: "role" })
  role: MemberRole;

  @ManyToOne(() => MemberEntity, (member) => member.roles)
  member: MemberEntity;

  @Column({
    name: "created_datetime",
    transformer: new LocalDateTimeTransformer(),
    nullable: false,
    type: "timestamptz",
  })
  createdDateTime: LocalDateTime;

  static create(role: MemberRole): MemberRoleEntity {
    const memberRole = new MemberRoleEntity();
    memberRole.role = role;
    memberRole.createdDateTime = LocalDateTime.now();
    return memberRole;
  }

  assignRole(member: MemberEntity) {
    this.member = member;
  }
}
