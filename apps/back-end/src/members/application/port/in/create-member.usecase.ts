import { CreateMemberCommand } from "./dto/create-member.command";

export const CreateMemberUseCaseSymbol = Symbol("CreateMemberUseCase");
export interface CreateMemberUseCase {
  create(command: CreateMemberCommand): Promise<number>;
}
