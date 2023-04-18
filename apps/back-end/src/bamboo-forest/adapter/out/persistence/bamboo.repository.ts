import { BambooEntity } from "@/bamboo-forest/domain/bamboo.entity";
import { PgDataSourceSymbol } from "@/infrastructure/datasource.providers";
import { Inject, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class BambooRepository extends Repository<BambooEntity> {
  constructor(@Inject(PgDataSourceSymbol) private readonly dataSource: DataSource) {
    super(BambooEntity, dataSource.createEntityManager());
  }
}
