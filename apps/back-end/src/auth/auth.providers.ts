import { SignInUseCaseSymbol } from "@/auth/application/port/in/sign-in.usecase";
import { SignUpUseCaseSymbol } from "@/auth/application/port/in/sign-up.usecase";
import { SignInService } from "@/auth/application/service/sign-in.service";
import { Provider } from "@nestjs/common";
import { SignUpService } from "./application/service/sign-up.service";

export const authProviders: Provider[] = [
  {
    provide: SignInUseCaseSymbol,
    useClass: SignInService,
  },
  { provide: SignUpUseCaseSymbol, useClass: SignUpService },
];
