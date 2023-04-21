import { CreateMemberCommand } from "./dto/create-member.command";

export interface CreateMemberUseCase {
  create(command: CreateMemberCommand): Promise<number>;
}
