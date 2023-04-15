import { BambooRepository } from "@/bamboo-forest/adapter/out/bamboo.repository";
import { BambooEntity } from "@/bamboo-forest/domain/bamboo.entity";
import { generateHashedValue } from "@/common/bcrypt.util";
import { Injectable } from "@nestjs/common";
import { CreateBambooUseCase } from "../port/create-bamboo.use-case";

@Injectable()
export class CreateBambooService implements CreateBambooUseCase {
  constructor(private readonly bambooRepository: BambooRepository) {}

  async create(content: string, password: string): Promise<number> {
    const hashedPassword = await generateHashedValue(password);
    const newBamboo = await this.bambooRepository.save(
      BambooEntity.create(content, hashedPassword),
    );
    return newBamboo.id;
  }
}
