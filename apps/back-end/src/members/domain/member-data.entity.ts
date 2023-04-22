import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "member_data" })
export class MemberDataEntity {
  @PrimaryGeneratedColumn({
    name: "member_data_id",
  })
  id: number;
}
