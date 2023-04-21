import { BambooRepository } from "@/bamboo-forest/adapter/out/persistence/bamboo.repository";
import { Injectable } from "@nestjs/common";
import { Bamboo } from "../port/in/dto/bamboo";
import { QueryBambooUseCase } from "../port/in/query-bamboo.use-case";

@Injectable()
export class QueryBambooService implements QueryBambooUseCase {
  constructor(private readonly repository: BambooRepository) {}

  fetchById(id: number): Promise<Bamboo> {
    return this.repository.findOneByOrFail({ id: id });
  }
  fetchAll(): Promise<Bamboo[]> {
    return this.repository.find();
  }
}
