import { PgDataSourceSymbol } from "@/infrastructure/datasource.providers";
import { MemberEntity } from "@/members/domain/member.entity";
import { Inject } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

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
}
