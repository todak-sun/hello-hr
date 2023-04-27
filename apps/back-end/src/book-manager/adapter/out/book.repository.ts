import { Inject } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { PgDataSourceSymbol } from "../../../infrastructure/datasource.providers";
import { BookEntity } from "../../domain/book.entity";

export class BookRepository extends Repository<BookEntity> {
  constructor(@Inject(PgDataSourceSymbol) private readonly dataSource: DataSource) {
    super(BookEntity, dataSource.createEntityManager());
  }
}
