import { compareValue, generateHashedValue } from "@/common/bcrypt.util";
import { LocalDateTimeTransformer } from "@/common/local-date-time.transformer";
import { LocalDateTime } from "@js-joda/core";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MemberRole } from "../types/member-role";
import { MemberRoleEntity } from "./member-role.entity";

@Entity({ name: "member" })
export class MemberEntity {
  @PrimaryGeneratedColumn({ name: "member_id" })
  id: number;

  @Column({ nullable: false, name: "username" })
  username: string;

  @Column({ nullable: false, name: "password" })
  password: string;

  @OneToMany(() => MemberRoleEntity, (role) => role.member, {
    cascade: true,
  })
  roles: MemberRoleEntity[] = [];

  @Column({
    nullable: false,
    name: "sign_up_datetime",
    type: "timestamptz",
    transformer: new LocalDateTimeTransformer(),
  })
  signUpDateTime: LocalDateTime;

  @Column({
    nullable: false,
    name: "updated_datetime",
    type: "timestamptz",
    transformer: new LocalDateTimeTransformer(),
  })
  updatedDateTime: LocalDateTime;

  static async create(username: string, password: string): Promise<MemberEntity> {
    const member = new MemberEntity();
    member.username = username;
    member.password = await generateHashedValue(password);
    member.signUpDateTime = LocalDateTime.now();
    member.updatedDateTime = LocalDateTime.now();
    member.roles = [];
    return member;
  }

  addRole(role: MemberRoleEntity | MemberRoleEntity[]) {
    const roles = Array.isArray(role) ? role : [role];
    roles.forEach((item) => {
      item.assignRole(this);
      this.roles.push(item);
    });
  }

  getRoles(): MemberRole[] {
    return this.roles.map((role) => role.role);
  }

  async isSamePassword(password: string): Promise<boolean> {
    return compareValue(password, this.password);
  }
}
