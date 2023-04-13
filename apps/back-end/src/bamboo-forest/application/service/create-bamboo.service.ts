import { Injectable } from "@nestjs/common";
import { BambooRepository } from "src/\bbamboo-forest/adapter/out/bamboo.repository";
import { BambooEntity } from "src/\bbamboo-forest/domain/bamboo.entity";
import { CreateBambooPort } from "../port/create-bamboo.port";

@Injectable()
export class CreateBambooService implements CreateBambooPort {
  constructor(private readonly bambooRepository: BambooRepository) {}

  async create(content: string, password: string): Promise<number> {
    const newBamboo = BambooEntity.create(content, password);

    return newBamboo.id;
  }
}
