import { CreateMemberCommand } from "../../../members/application/port/in/dto/create-member.command";
import { SignUpService } from "./sign-up.service";

describe("SignUpService Test", () => {
  let signUpService: SignUpService;
  beforeAll(async () => {
    signUpService = new SignUpService({
      async create(command: CreateMemberCommand) {
        return 1;
      },
    });
  });

  it("signUp", async () => {
    const result = await signUpService.signUp("username", "password");

    expect(result).toBe(1);
  });
});
