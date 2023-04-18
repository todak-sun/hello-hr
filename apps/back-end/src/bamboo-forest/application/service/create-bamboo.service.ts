import { BambooRepository } from "@/bamboo-forest/adapter/out/persistence/bamboo.repository";
import { BambooEntity } from "@/bamboo-forest/domain/bamboo.entity";
import { generateHashedValue } from "@/common/bcrypt.util";
import { Injectable } from "@nestjs/common";
import { CreateBambooUseCase } from "../port/in/create-bamboo.use-case";

@Injectable()
export class CreateBambooService implements CreateBambooUseCase {
  constructor(private readonly bambooRepository: BambooRepository) {}

  async create(title: string, content: string, password: string): Promise<number> {
    const hashedPassword = await generateHashedValue(password);
    const newBamboo = await this.bambooRepository.save(BambooEntity.create(title, content, hashedPassword));
    return newBamboo.id;
  }
}
