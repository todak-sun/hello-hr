import { QueryMemberSchema } from "./dto/query-member.schema";

export const QueryMemberUseCaseSymbol = Symbol("QueryMemberUseCase");

export interface QueryMemberUseCase {
  queryMany(): Promise<QueryMemberSchema[]>;
}
