import { ResList } from "@hello-hr/interfaces/response";
import { Controller, Get, Inject } from "@nestjs/common";
import { QueryMemberSchema } from "../../../application/port/out/dto/query-member.schema";
import { QueryMemberUseCase, QueryMemberUseCaseSymbol } from "../../../application/port/out/query-member.usecase";

@Controller("/members")
export class MemberController {
  constructor(@Inject(QueryMemberUseCaseSymbol) private readonly queryMemberUseCase: QueryMemberUseCase) {}

  @Get("")
  async fetchMembers(): Promise<ResList<QueryMemberSchema>> {
    const members = await this.queryMemberUseCase.queryMany();
    const response: ResList<QueryMemberSchema> = {
      content: members,
      size: members.length,
      meta: { apiVersion: "v1" },
    };
    return response;
  }
}
