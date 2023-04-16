import { Bamboo } from "./dto/bamboo";

export interface QueryBambooUseCase {
  fetchById(id: number): Promise<Bamboo> | Bamboo;
  fetchAll(): Promise<Bamboo[]> | Bamboo[];
}
