import { Provider } from "@nestjs/common";
import { CreateMemberUseCaseSymbol } from "./application/port/in/create-member.usecase";
import { FindMemberUseCaseSymbol } from "./application/port/in/find-member.usecase";
import { QueryMemberUseCaseSymbol } from "./application/port/out/query-member.usecase";
import { CreateMemberService } from "./application/service/create-member.service";
import { FindMemberService } from "./application/service/find-member.service";
import { QueryMemberService } from "./application/service/query-member.service";

export const memberProviders: Provider[] = [
  {
    provide: CreateMemberUseCaseSymbol,
    useClass: CreateMemberService,
  },
  {
    provide: FindMemberUseCaseSymbol,
    useClass: FindMemberService,
  },
  {
    provide: QueryMemberUseCaseSymbol,
    useClass: QueryMemberService,
  },
];
