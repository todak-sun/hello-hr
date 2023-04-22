import { PgDataSourceSymbol } from "@/infrastructure/datasource.providers";
import { MemberEntity } from "@/members/domain/member.entity";
import { Inject } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { QueryMemberSchema } from "../../../application/port/out/dto/query-member.schema";

export class MemberRepository extends Repository<MemberEntity> {
  constructor(@Inject(PgDataSourceSymbol) private readonly dataSource: DataSource) {
    super(MemberEntity, dataSource.createEntityManager());
  }

  async findOneById(memberId: number) {
    return await this.createQueryBuilder("member")
      .leftJoinAndSelect("member.roles", "role")
      .where("member.id = :id", { id: memberId })
      .getOne();
  }

  async findOneByUsername(username: string) {
    return await this.createQueryBuilder("member")
      .leftJoinAndSelect("member.roles", "role")
      .where("member.username = :username", { username })
      .getOne();
  }

  async queryAll(): Promise<QueryMemberSchema[]> {
    const members = await this.createQueryBuilder("member")
      .leftJoin("member.roles", "role")
      .select(["member.id", "member.username", "member.signUpDateTime", "role"])
      .getMany();
    return members.map((m) => {
      return { id: m.id, username: m.username, signedUpAt: m.signUpDateTime, roles: m.getRoles() };
    });
  }
}
