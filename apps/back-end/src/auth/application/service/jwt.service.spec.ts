import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { JWTService } from "./jwt.service";

describe("jwt service test", () => {
  let module: TestingModule;
  let jwtService: JWTService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: ".env" })],
      providers: [ConfigService],
      exports: [ConfigService],
    }).compile();
    const config = module.get(ConfigService);
    jwtService = new JWTService(config.get("KEY_DIRECTORY_PATH"));
  });

  afterAll(async () => {
    await module.close();
  });

  it("sign token", () => {
    // given
    const username = "hello@hr.com";

    // when
    const token = jwtService.signToken({ username });
    const verifyResult = jwtService.verifyToken<{ username: string }>(token);

    // then
    expect(verifyResult.username).toBe(username);
  });
});
